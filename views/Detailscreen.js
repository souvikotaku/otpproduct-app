import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Toast from "react-native-toast-message";

import {
  productObjectarray,
  productObjectarraycart,
  productObject,
  productObjectarrayremove,
  productObjectarrayremovecart,
  fromPage,
} from "../redux/dataSlice";
import { useDispatch } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import axios from "axios";
import { Rating, AirbnbRating } from "react-native-ratings";

const { width } = Dimensions.get("window");

// import Carousel from "react-native-snap-carousel";

function Detailscreen({ navigation }) {
  const dispatch = useDispatch();

  const productId = useSelector((state) => state.data.productid);
  const productArrayredux = useSelector(
    (state) => state.data.productobjectarray
  );

  const productArrayreduxcart = useSelector(
    (state) => state.data.productobjectarraycart
  );

  // console.log("productArrayreduxcart", productArrayreduxcart);
  const productArrayobject = useSelector((state) => state.data.productobject);
  // console.log("productArrayobject", productArrayobject);

  // console.log("productArrayredux", productArrayredux);

  const [productdetails, setProductdetails] = useState();
  const [favorites, setFavorites] = useState();
  const [incart, setIncart] = useState();

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

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

  const handleIconClickadd = (productobject) => {
    dispatch(productObjectarray(productobject));
    Toast.show({
      type: "success",
      text1: "Added to favorites",
      // text2: "",
    });
  };

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

  const handleIconClickremove = (productobject) => {
    dispatch(productObjectarrayremove(productobject));
    Toast.show({
      type: "error",
      text1: "Removed from favorites",
      // text2: "",
    });
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
    console.log("itemExistsincart", itemExistsincart(productId));
    if (itemExistsincart(productId) === true) {
      setIncart(true);
    } else {
      setIncart(false);
    }
  }, [productArrayreduxcart]);

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
          //   backgroundColor: "red",
          height: 300,
          width: "100%",
        }}
      >
        <View
          style={{
            paddingLeft: "5%",
            paddingRight: "5%",
            marginTop: "4%",
            flexDirection: "row",
            justifyContent: "space-between",
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
              navigation.navigate("Home");
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              color={"black"}
              size={30}
            />
          </TouchableOpacity>
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
              dispatch(fromPage("Details"));
              navigation.navigate("Cart");
            }}
          >
            <SimpleLineIcons name="basket" color={"black"} size={30} />
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
        <View
          style={{
            marginTop: "6%",
            paddingLeft: "5%",
            paddingRight: "5%",
            marginBottom: "3%",
          }}
        >
          <Text style={styles.detailheader}>{productdetails?.title}</Text>
        </View>
        <View
          style={{
            marginBottom: "3%",
            alignItems: "flex-start",
            paddingLeft: "5%",
          }}
        >
          <AirbnbRating
            size={20}
            showRating={false}
            isDisabled={true}
            defaultRating={productdetails?.rating} // Set the fetched rating here
          />
        </View>

        {/* <View style={{ flex: 1}}> */}
        <View
          style={{
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={{
              // backgroundColor: "#F8F9FB",
              zIndex: 1,
              width: 35,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              position: "absolute",
              right: 0,
              marginRight: "6%",
              // elevation: 5,
              // shadowColor: "black",
            }}
            onPress={() => {
              // navigation.navigate("Home");
              setFavorites(!favorites);
              if (favorites === true) {
                handleIconClickremove(productArrayobject);
              } else {
                handleIconClickadd(productArrayobject);
              }
            }}
          >
            {favorites === true ? (
              <Ionicons name="heart-sharp" color={"red"} size={30} />
            ) : (
              <Ionicons name="heart-outline" color={"red"} size={30} />
            )}
          </TouchableOpacity>
        </View>

        <Carousel
          width={width}
          height={width / 2}
          autoPlay={true}
          data={productdetails?.images}
          scrollAnimationDuration={1000}
          renderItem={renderItem}
          // sliderWidth={width}
          // itemWidth={width}
        />
        {/* </View> */}
        <View>
          <View
            style={{
              paddingLeft: "6%",
              paddingRight: "6%",
              textAlign: "left",
              marginTop: "5%",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Text style={styles.pricetext}>{`$${productdetails?.price}`}</Text>
            <View style={styles.pricetext2div}>
              <Text
                style={styles.pricetext2}
              >{`$${productdetails?.discountPercentage} OFF`}</Text>
            </View>
          </View>
          <View
            style={{
              paddingTop: 20,
              paddingLeft: "6%",
              paddingRight: "6%",
              // textAlign: "center",
              // backgroundColor: "pink",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {incart == true ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  dispatch(fromPage("Details"));
                  navigation.navigate("Cart");
                }}
              >
                <Text style={styles.text}>{"Go To Cart"}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setIncart(true);
                  handleIconClickaddcart(productArrayobject);
                }}
              >
                <Text style={styles.text}>{"Add To Cart"}</Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              style={styles.button}
              onClick={() => {
                setIncart(!incart);

                handleIconClickaddcart(productArrayobject);
              }}
            >
              <Text style={styles.text}>{"Add To Cart"}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button2}>
              <Text style={styles.text2}>{"Buy Now"}</Text>
            </TouchableOpacity>
            {/* <Button title="Buy Now" /> */}
          </View>
          <View
            style={{
              paddingTop: 20,
              paddingLeft: "6%",
              paddingRight: "6%",
              // textAlign: "center",
              // backgroundColor: "pink",
              // flexDirection: "row",
              width: "100%",
              // justifyContent: "space-between",
            }}
          >
            <Text style={styles.text3}>DETAILS</Text>
            <Text style={styles.text4}>{productdetails?.description}</Text>
          </View>
        </View>
      </View>
      <Toast />
    </View>
  );
}

export default Detailscreen;

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
    width: "48%",
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
});
