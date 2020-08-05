import React from "react";
import { Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const PipelineModal = ({ toggleModal, pipeline }) => {
  return (
    <Modal
      presentationStyle={"formSheet"}
      animationType="slide"
      transparent={false}
      style={styles.modal}
      onRequestClose={() => console.log("dismissed")}
      onDismiss={() => console.log("dismissed")}
      onRequestClose={() => console.log("dismissed")}
    >
      <View style={styles.modal}>
        <TouchableWithoutFeedback
          onPressIn={() => toggleModal(false)}
          onPress={() => toggleModal(true)}
        >
          <Image
            source={{ uri: pipeline.branchInsignia }}
            style={styles.unitLogo}
          />

          <Image
            source={{ uri: pipeline.pipelineCoverPhoto }}
            style={styles.cardPhoto}
          />

          <ScrollView>
            <Text style={styles.nickname}>{pipeline.nickname}</Text>
            <Text style={styles.description}>{pipeline.description}</Text>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => toggleModal(true)}
            >
              <Text style={styles.viewButtonText}>View Pipeline</Text>
            </TouchableOpacity>
            <Button title="Close" onPress={() => toggleModal(false)} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0,
  },
  unitLogo: {
    position: "absolute",
    height: 100,
    width: "auto",
    top: -15,
    right: -10,
    zIndex: 1,
  },
  cardPhoto: {
    borderRadius: 7,
    width: "100%",
    height: 200,
  },
  nickname: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 32,
    textAlign: "center",
    paddingTop: 5,
  },
  description: {
    lineHeight: 30,
    marginHorizontal: 20,
    overflow: "hidden",
    textAlign: "left",
  },
  viewButton: {
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 40,
  },
  viewButtonText: {
    color: "white",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 18,
    textAlign: "center",
  },
});

export default PipelineModal;
