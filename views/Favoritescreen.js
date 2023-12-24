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
import axios from "axios";
import { productId } from "../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const Favoritescreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const productArrayfavoriteredux = useSelector(
    (state) => state.data.productobjectarray
  );
  //   console.log("productArrayfavoriteredux", productArrayfavoriteredux);

  const [productdata, setProductdata] = useState();
  const Item = ({ title, item }) => (
    // <View style={styles.item}>
    //   <Text style={styles.title}>{title}</Text>
    // </View>
    <View style={styles.prodcarddiv}>
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

  return (
    <View style={styles.container}>
      {/* <View style={styles.container4}> */}
      {productArrayfavoriteredux?.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            paddingTop: 10,
          }}
          numColumns={2}
          data={productArrayfavoriteredux && productArrayfavoriteredux}
          // horizontal={true}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
              }}
            >
              No favorites added yet
            </Text>
          </View>
        </>
      )}

      {/* </ScrollView> */}
      {/* </View> */}
    </View>
  );
};

export default Favoritescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: "5%",
    paddingRight: "5%",
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
    resizeMode: "cover",
  },
  prodimage2: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  container4: {
    // flex: 1,
    // paddingTop: "20%",
    // paddingBottom: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: "white",
    width: "100%",
    // height: "100%",
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
