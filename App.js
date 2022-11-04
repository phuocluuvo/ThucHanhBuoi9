import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [locationCat, setLocation] = useState({
    x: 0,
    y: 0,
    left: new Animated.Value(10),
    top: new Animated.Value(10),
  });
  const loactionCatX = useRef(0);
  const loactionCatY = useRef(0);

  const [health, setHealth] = useState(3);
  const [locationMouse, setMouseLocation] = useState({
    x: 0,
    y: 0,
    left: new Animated.Value(100),
    top: new Animated.Value(100),
  });

  const loactionMouseX = useRef(0);
  const loactionMouseY = useRef(0);

  function onPressMouse(e) {
    let x = e.nativeEvent.locationX;
    let y = e.nativeEvent.locationY;
    loactionMouseY.current = x;
    loactionMouseX.current = y;

    if (health > 0)
      setMouseLocation({
        x: x,
        y: y,
        left: Math.random() * 310 - 15,
        top: Math.random() * 400 - 15,
      });
    else
      setLocation({
        x: locationMouse.x,
        y: locationMouse.y,
        left: x,
        top: y,
      });
  }

  function onPress(evt) {
    let x = evt.nativeEvent.locationX;
    let y = evt.nativeEvent.locationY;
    setLocation({
      x: x,
      y: y,
      left: x - 30,
      top: y - 30,
    });
  }
  function onMove(evt) {}
  function onRelease() {}
  const [isCatched, setIsCatched] = useState(false);
  const { top, left } = locationCat;

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={onPress}
      onResponderMove={onMove}
      onResponderRelease={onRelease}
    >
      <TouchableOpacity
        onPress={() => {
          if (health > 0) {
            //setHealth(health - 1);
            // setMouseLocation({
            //   left: Math.random() * 310 - 15,
            //   top: Math.random() * 200 - 15,
            // });
            setLocation({
              x: locationMouse.x,
              y: locationMouse.y,
              left: locationMouse.left,
              top: locationMouse.top,
            });
          }
        }}
      >
        {!isCatched && (
          <Animated.Image
            className={"w-10 h-10 absolute"}
            source={require("./assets/mouse.png")}
            style={{ top: locationMouse.top, left: locationMouse.left }}
          />
        )}
      </TouchableOpacity>

      <Animated.Image
        source={require("./assets/kitty.png")}
        className="w-20 h-20 absolute"
        style={{ top: top, left: left }}
      ></Animated.Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
