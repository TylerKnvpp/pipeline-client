import React from "react";
import { Button, View, Text, Image, StyleSheet, Modal } from "react-native";
import { SairaStencilOne_400Regular } from "@expo-google-fonts/saira-stencil-one";
import { TouchableOpacity } from "react-native-gesture-handler";

import PipelineModal from "./PipelineModal";

const PipelineCard = ({ pipeline, toggleModal, cardSelector, index }) => {
  //   const [showModal, toggleModal] = React.useState(false);

  //   if (showModal) {
  //     return <PipelineModal pipeline={pipeline} toggleModal={toggleModal} />;
  //   }

  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: pipeline.branchInsignia }}
        style={styles.unitLogo}
      />
      <Image
        source={{ uri: pipeline.pipelineCoverPhoto }}
        style={styles.cardPhoto}
      />
      <Text style={styles.nickname}>{pipeline.nickname}</Text>
      <Text style={styles.description}>
        {pipeline.description.length > 80
          ? pipeline.description.substring(0, 200).concat("...")
          : pipeline.description}
      </Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => {
          cardSelector(index);
          toggleModal(true);
        }}
      >
        <Text style={styles.viewButtonText}>View Pipeline</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderColor: "#000",
    // borderWidth: 2,
    borderRadius: 7,
    marginRight: 40,
    marginVertical: 20,
    paddingBottom: 20,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.2,
    height: "80%",
    width: 290,
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
    textAlign: "center",
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

export default PipelineCard;
