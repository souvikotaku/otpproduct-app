import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast from "react-native-toast-message";

import axios from "axios";
import {
  productId,
  fromPage,
  productObjectarraycart,
  productObjectarray,
} from "../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

const Homescreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [productdata, setProductdata] = useState();
  const [favorites, setFavorites] = useState();
  const [favoritearray, setFavoritearray] = useState();
  const [cartarray, setCartarray] = useState();
  const productArrayredux = useSelector(
    (state) => state.data.productobjectarray
  );

  const productArrayreduxcart = useSelector(
    (state) => state.data.productobjectarraycart
  );
  const Item = ({ title, item }) => {
    const handleIconClickaddcart = (productobject) => {
      const updatedObject = {
        ...productobject,
        prices: [productobject.price],
      };

      dispatch(productObjectarraycart(updatedObject));
      Toast.show({
        type: "success",
        text1: "Added to cart",
        // text2: "",
      });
    };

    const handleIconClickaddfavorites = (productobject) => {
      dispatch(productObjectarray(productobject));

      Toast.show({
        type: "success",
        text1: "Added to favorites",
        // text2: "",
      });
    };
    return (
      // <View style={styles.item}>
      //   <Text style={styles.title}>{title}</Text>
      // </View>
      <View style={styles.prodcarddiv}>
        <View
          style={{
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              pointerEvents:
                favoritearray?.some((obj) => obj.id === item.id) && "none",
              zIndex: 1,
              width: 25,
              height: 25,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              position: "absolute",
              left: 0,
              marginLeft: "2%",
              marginTop: "2%",
              // elevation: 5,
              // shadowColor: "black",
            }}
            onPress={() => {
              favoritearray?.some((obj) => obj.id === item.id)
                ? null
                : handleIconClickaddfavorites(item);
            }}
          >
            {favoritearray?.some((obj) => obj.id === item.id) ? (
              <Ionicons name="heart-sharp" color={"#f08080"} size={20} />
            ) : (
              <Ionicons name="heart-outline" color={"#f08080"} size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              pointerEvents:
                cartarray?.some((obj) => obj.id === item.id) && "none",
              zIndex: 1,
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              position: "absolute",
              right: 0,
              top: 120,
              marginLeft: "2%",
              marginTop: "2%",
              // elevation: 5,
              // shadowColor: "black",
            }}
            onPress={() => {
              cartarray?.some((obj) => obj.id === item.id)
                ? null
                : handleIconClickaddcart(item);
            }}
          >
            {cartarray?.some((obj) => obj.id === item.id) ? (
              <AntDesign name="pluscircle" color={"#2A4BA0"} size={20} />
            ) : (
              <AntDesign name="pluscircleo" color={"#2A4BA0"} size={20} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(productId(item?.id));
            navigation.navigate("Details", { item });
          }}
        >
          <View>
            <Image source={{ uri: item?.thumbnail }} style={styles.prodimage} />
            <Text
              style={{
                marginTop: 10,
              }}
            >{`$${item?.price}`}</Text>
            <Text>{item?.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    axios
      // .get("https://dummyjson.com/products")
      .get("https://dummyjson.com/products")
      .then((res) => {
        // console.log("data", res?.data?.products);
        setProductdata(res?.data?.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const renderItem = ({ item }) => <Item title={item.title} item={item} />;

  useEffect(() => {
    // function itemExistsinfavorite(id) {
    //   return productArrayredux.some(function (el) {
    //     return el.id === id;
    //   });
    // }
    // itemExistsinfavorite(productId);
    // console.log("itemExistsinfavorite", itemExistsinfavorite(productId));
    // function itemExistsinfavorite(id) {
    //   return productArrayredux.some(function (el) {
    //     return el.id === id;
    //   });
    // }
    const newArrayprod = [];
    productArrayredux &&
      productArrayredux?.map((item) => {
        const filteredObj = productdata?.find((obj) => obj?.id === item?.id);

        // console.log("filteredObj", filteredObj);
        // newArrayprod.push(filteredArr);
        if (filteredObj) {
          newArrayprod.push(filteredObj); // Push each filteredObj into the array
        }
      });
    // console.log("newArrayprod", newArrayprod);
    setFavoritearray(newArrayprod);

    const newArrayprodcart = [];
    productArrayreduxcart &&
      productArrayreduxcart?.map((item) => {
        const filteredObj = productdata?.find((obj) => obj?.id === item?.id);

        // console.log("filteredObj", filteredObj);
        // newArrayprod.push(filteredArr);
        if (filteredObj) {
          newArrayprodcart.push(filteredObj); // Push each filteredObj into the array
        }
      });

    setCartarray(newArrayprodcart);
  }, [productArrayredux, productArrayreduxcart]);

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.container2}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.nameheading}>Hey, Souvik</Text>
          <TouchableOpacity
            style={{
              // backgroundColor: "#F8F9FB",
              width: 35,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 70,
              flexDirection: "row",
              // elevation: 5,
              // shadowColor: "black",
            }}
            onPress={() => {
              navigation.navigate("Cart");
              dispatch(fromPage("Home"));
            }}
          >
            <SimpleLineIcons name="basket" color={"white"} size={30} />
            {productArrayreduxcart && productArrayreduxcart?.length > 0 && (
              <View
                style={{
                  position: "relative",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#F9B023",
                    paddingLeft: 7,
                    paddingRight: 7,
                    borderRadius: 70,
                    position: "absolute",
                    top: -20,
                    left: -15,
                  }}
                >
                  <Text>
                    {productArrayreduxcart && productArrayreduxcart?.length}
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.nameheading}>Hey, Rahul</Text> */}
        <View>
          <TextInput
            style={styles.input}
            placeholder="Search Products or store"
            placeholderTextColor="white"

            // onChangeText={(text) => onChangeText(text)}
            // value={value}
          />
          <Ionicons
            name="search-outline"
            color={"white"}
            size={20}
            style={{ position: "absolute", left: 10, top: 47 }}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: "6%",
          }}
        >
          <View>
            <Text style={styles.letterone}>DELIVERY TO</Text>
            <Text style={styles.lettertwo}>Green Way 3000, Sylhet</Text>
          </View>

          <View>
            <Text style={styles.letteroneright}>WITHIN</Text>
            <Text style={styles.lettertworight}>1 Hour</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View>
          <View style={styles.container3}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  width: 270,
                }}
              >
                <TouchableOpacity>
                  <Image
                    source={require("./assets/cardnew1.png")}
                    // style={{ width: "100%", height: 250 }}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </TouchableOpacity>
                {/* <Text>Child 1</Text> */}
              </View>

              <View
                style={{
                  width: 270,
                }}
              >
                <TouchableOpacity>
                  <Image
                    source={require("./assets/cardnew2.png")}
                    // style={{ width: "100%", height: 250 }}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </TouchableOpacity>
                {/* <Text>Child 1</Text> */}
              </View>
            </ScrollView>
          </View>

          <View style={styles.container4}>
            <Text style={styles.recommendedheader}>Recommended</Text>
            {/* <ScrollView
            style={{
              paddingTop: 10,
            }}
            // showsVerticalScrollIndicator={false}
          > */}
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
                paddingTop: 10,
              }}
              numColumns={2}
              data={productdata && productdata}
              // horizontal={true}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            {/* </ScrollView> */}
          </View>
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: "center",
    justifyContent: "start",
  },
  container2: {
    // flex: 1,
    paddingTop: "17%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: "#2A4BA0",
    width: "100%",
    height: 270,
  },
  prodcarddiv: {
    backgroundColor: "#F8F9FB",
    width: "47%",
    height: "max-content",
    margin: 6,
    padding: 12,
    borderRadius: 12,
    // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

    elevation: 5,
    shadowColor: "black", // marginBottom: 10,
  },

  container3: {
    // flex: 1,
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: "white",
    width: "100%",
    height: 160,
  },
  prodimage: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
  },
  container4: {
    // flex: 1,
    paddingTop: "3%",
    // paddingBottom: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: "white",
    width: "100%",
    // height: 360,
    // flex: 1,
    // flexDirection: "row",
  },
  nameheading: {
    textAlign: "left",
    // fontFamily: "Manrope",
    // fontWeight: "bold",
    fontSize: 22,
    lineHeight: 30,
    color: "white",
  },
  input: {
    height: 40,
    backgroundColor: "#153075",
    marginTop: 30,
    paddingLeft: 40,
    borderRadius: 28,
    height: 56,
    padding: 20,
    color: "white",
  },
  letterone: {
    fontSize: 11,
    color: "#F8F9FB",
    opacity: 0.5,
  },
  letteroneright: {
    fontSize: 11,
    color: "#F8F9FB",
    opacity: 0.5,
    textAlign: "right",
  },
  lettertwo: {
    fontSize: 14,
    color: "#F8F9FB",
  },
  lettertworight: {
    fontSize: 14,
    color: "#F8F9FB",
    textAlign: "right",
  },
  recommendedheader: {
    fontSize: 30,
  },

  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
