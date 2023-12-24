import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Alert } from "react-native";

import {
  productObject,
  productObjectarraycartremove,
  clearArraycart,
} from "../redux/dataSlice";
import { useDispatch } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import axios from "axios";
import { Rating, AirbnbRating } from "react-native-ratings";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

// import Carousel from "react-native-snap-carousel";

function Cartscreen({ navigation }) {
  const dispatch = useDispatch();

  const productId = useSelector((state) => state.data.productid);
  const frompage = useSelector((state) => state.data.frompage);
  const productArrayredux = useSelector(
    (state) => state.data.productobjectarray
  );

  const productArrayreduxcart = useSelector(
    (state) => state.data.productobjectarraycart
  );

  //   console.log("productArrayreduxcart", productArrayreduxcart);
  const productArrayobject = useSelector((state) => state.data.productobject);
  // console.log("productArrayobject", productArrayobject);

  // console.log("productArrayredux", productArrayredux);

  const [productdetails, setProductdetails] = useState();
  const [favorites, setFavorites] = useState();
  const [incart, setIncart] = useState();
  const [priceTotal, setPriceTotal] = useState();
  const [cartData, setCartData] = useState();

  const Item = ({ title, item }) => (
    // <View style={styles.item}>
    //   <Text style={styles.title}>{title}</Text>
    // </View>
    <View style={styles.prodcarddiv}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 20,
          paddingBottom: 20,
          paddingRight: 10,
          // backgroundColor: "red",
          borderBottomColor: "#EBEBFB",
          borderBottomWidth: 1,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: 50,
          }}
        >
          <Image source={{ uri: item?.thumbnail }} style={styles.prodimage} />
        </View>
        <View
          style={{
            //   backgroundColor: "yellow",
            width: "45%",
          }}
        >
          <Text>{item?.title}</Text>
          <Text
          //   style={{
          //     marginTop: 10,

          //   }}
          >{`$${item?.price}`}</Text>
        </View>
        <View
          style={{
            //   backgroundColor: "yellow",
            flexDirection: "row",
            // marginLeft: "60%",
          }}
        >
          <View
            style={{
              // padding: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#F8F9FB",
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 70,
                elevation: 5,
                shadowColor: "black",
              }}
              onPress={() => {
                // navigation.navigate("Details");
                handleClickremove(item);
              }}
            >
              <Feather name="minus" color={"black"} size={30} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 14 }}>{item?.prices?.length}</Text>
          </View>
          <View
            style={{
              // padding: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#F8F9FB",
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 70,
                elevation: 5,
                shadowColor: "black",
              }}
              onPress={() => {
                // navigation.navigate("Details");
                handleClickadd(item);
              }}
            >
              <Feather name="plus" color={"black"} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.title} item={item} />;

  useEffect(() => {
    axios
      // .get("https://dummyjson.com/products")
      .get(`https://dummyjson.com/products/${productId}`)
      .then((res) => {
        // console.log("data", res?.data);
        setProductdetails(res?.data);
        dispatch(productObject(res?.data));

        // setProductdata(res?.data?.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClickadd = (item) => {
    // Create a copy of the data to avoid mutating the state directly
    const newData = [...cartData];
    // const index = newData.findIndex((element) => element === item);

    const indexnew = newData.findIndex((el) => el.id === item?.id);
    // console.log("index", indexnew);
    // console.log("item", item);

    newData[indexnew].prices?.push(item?.price);

    // Update the state with the new data
    setCartData(newData);
    // console.log("newData", newData);

    // dispatch(productObjectarraycart(item));
    // dispatch(productObjectarraycartadd(newData));
    // setCartData(newData);

    const priceArray = [];
    newData.map((item) => {
      const objnew = {
        id: item.id,
        price: item.price,
        prices: item?.prices,
      };
      priceArray.push(objnew);
    });

    // console.log("priceArray", priceArray);

    const totalPrice = priceArray.reduce((acc, obj) => {
      const priceSum = obj.prices.reduce((sum, value) => sum + value, 0);
      return acc + priceSum;
    }, 0);

    setPriceTotal(totalPrice);
  };

  const handleClickremove = (item) => {
    // Create a copy of the data to avoid mutating the state directly
    const newData = [...cartData];
    // const index = newData.findIndex((element) => element === item);

    const indexnew = newData.findIndex((el) => el.id === item?.id);
    // console.log("index", indexnew);
    // console.log("item", item);
    newData[indexnew].prices?.pop();

    // Update the state with the new data
    setCartData(newData);
    // console.log("newData", newData);
    dispatch(productObjectarraycartremove(item));

    const priceArray = [];
    newData.map((item) => {
      //   dispatch(priceAddedcart(item?.price));
      const objnew = {
        id: item.id,
        price: item.price,
        prices: item?.prices,
      };
      priceArray.push(objnew);
    });

    // console.log("priceArray", priceArray);
    newData?.map((item, index) => {
      if (item.prices?.length === 0) {
        newData.splice(index, 1);
      }
    });

    const totalPrice = priceArray.reduce((acc, obj) => {
      const priceSum = obj.prices.reduce((sum, value) => sum + value, 0);
      return acc + priceSum;
    }, 0);

    setPriceTotal(totalPrice);
    console.log("cartData", cartData);

    // cartData?.map((item)=>{
    //     if (item?.prices === undefined){
    //         dispatch(clearArraycart());
    //     }
    // })

    // if (cartData?.prices === undefined) {
    //   //   console.log("cartData", cartData);
    //   //   dispatch(clearArraycart());
    //   console.log("removed all");
    // }
  };

  useEffect(() => {
    function itemExistsinfavorite(id) {
      return productArrayredux.some(function (el) {
        return el.id === id;
      });
    }
    itemExistsinfavorite(productId);
    // console.log("itemExistsinfavorite", itemExistsinfavorite(productId));
    if (itemExistsinfavorite(productId) === true) {
      setFavorites(true);
    } else {
      setFavorites(false);
    }

    function itemExistsincart(id) {
      return productArrayreduxcart.some(function (el) {
        return el.id === id;
      });
    }
    itemExistsincart(productId);
    // console.log("itemExistsinfavorite", itemExistsinfavorite(productId));
    if (itemExistsincart(productId) === true) {
      setIncart(true);
    } else {
      setIncart(false);
    }

    const priceArray = [];
    productArrayreduxcart.map((item) => {
      //   dispatch(priceAddedcart(item?.price));

      const objnew = {
        id: item.id,
        price: item.price,
        prices: [item?.price],
      };
      priceArray.push(objnew);
    });

    // console.log("priceArray", priceArray);
    // const sumTotal = priceArray?.reduce((acc, obj) => acc + obj?.price, 0);

    const totalPrice = priceArray.reduce((acc, obj) => {
      const priceSum = obj.prices.reduce((sum, value) => sum + value, 0);
      return acc + priceSum;
    }, 0);
    setPriceTotal(totalPrice);

    const newData = productArrayreduxcart.map((item) => ({
      ...item,
      //   prices: [item.price],
      prices: [item?.price],
    }));

    // Update the state with the new data
    // console.log("added price data: ", newData);
    setCartData(newData);
  }, []);

  // useEffect(() => {
  //   function itemExistsincart(id) {
  //     return productArrayreduxcart.some(function (el) {
  //       return el.id === id;
  //     });
  //   }
  //   itemExistsincart(productId);
  //   // console.log("itemExistsinfavorite", itemExistsinfavorite(productId));
  //   if (itemExistsincart(productId) === true) {
  //     setIncart(true);
  //   } else {
  //     setIncart(false);
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 300,
          width: "100%",
          flex: 1,
          //   backgroundColor: "pink",
          justifyContent: "space-between",
        }}
      >
        <View
        //   style={{
        //     backgroundColor: "lightblue",
        //   }}
        >
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "red",
            }}
          >
            <View
              style={{
                paddingLeft: "5%",
                paddingRight: "5%",
                marginTop: "4%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#F8F9FB",
                  width: 35,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 70,
                  elevation: 5,
                  shadowColor: "black",
                }}
                onPress={() => {
                  frompage && frompage === "Home"
                    ? navigation.navigate("Home")
                    : navigation.navigate("Details");
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  color={"black"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: "4%",
                //   backgroundColor: "pink",
                flex: 1,
                alignItems: "start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                {`Shopping Cart (${cartData?.length})`}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
          >
            {/* {console.log("cartdata", cartData)} */}
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
                paddingTop: 10,
              }}
              // numColumns={2}
              // data={productArrayreduxcart && productArrayreduxcart}
              data={cartData && cartData}
              // horizontal={true}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        {cartData?.length > 0 ? (
          <View
            style={{
              // backgroundColor: "yellow",
              // height: "50%",
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
          >
            <View
              style={{
                backgroundColor: "#F8F9FB",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                elevation: 5,
                shadowColor: "black",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "red",
                  padding: "10%",
                  paddingBottom: "5%",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#616A7D",
                  }}
                >
                  Subtotal
                </Text>
                <Text>{`$${priceTotal}`}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "red",
                  padding: "10%",
                  paddingTop: "0%",
                  paddingBottom: "5%",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#616A7D",
                  }}
                >
                  Delivery
                </Text>
                <Text>{`$${10}`}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "red",
                  padding: "10%",
                  paddingTop: "0%",
                  paddingBottom: "5%",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#616A7D",
                  }}
                >
                  Total
                </Text>
                <Text>{`$${priceTotal + 10}`}</Text>
              </View>
              <View
                style={{
                  paddingTop: 20,
                  paddingLeft: "6%",
                  paddingRight: "6%",
                  paddingBottom: "7%",
                  // textAlign: "center",
                  // backgroundColor: "pink",
                  flexDirection: "row",
                  width: "100%",
                  // justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => {
                    Alert.alert("Thanks ", "for the purchase", [
                      // {
                      //   text: "Ask me later",
                      //   onPress: () => console.log("Ask me later pressed"),
                      // },
                      // {
                      //   text: "Cancel",
                      //   onPress: () => console.log("Cancel Pressed"),
                      //   style: "cancel",
                      // },
                      {
                        text: "OK",
                        onPress: () => {
                          navigation.navigate("Home");
                        },
                      },
                    ]);
                  }}
                >
                  <Text style={styles.text2}>{"Proceed To checkout"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <>
            <Image
              source={require("./assets/pika.png")}
              style={styles.prodimage2}
            />
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  marginBottom: 150,
                }}
              >
                Cart Empty
              </Text>
            </View>
          </>
        )}
      </View>
      <Toast />
    </View>
  );
}

export default Cartscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: 40,

    // width: "100%",
  },
  detailheader: {
    fontSize: 50,
    fontWeight: "bold",
    lineHeight: 50,
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  prodimage2: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  buttonnew: {
    height: 200,
    width: "50%",
  },
  pricetext: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "#2A4BA0",
  },
  pricetext2div: {
    backgroundColor: "#2A4BA0",
    marginLeft: "5%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 70,
  },
  pricetext2: {
    fontSize: 12,
    // paddingLeft: "5%",
    // fontWeight: "bold",
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#2A4BA0",
    width: "48%",
    height: 70,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#2A4BA0",
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#2A4BA0",
    borderWidth: 1,
    borderColor: "#2A4BA0",
    width: "100%",
    height: 70,
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text3: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#1E222B",
  },
  text4: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#8891A5",
  },
  prodimage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
