import React from "react";
import { Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import DurationDetails from "./DurationDetails";
import PSTCard from "./PSTCard";

const PipelineModal = ({ toggleModal, pipeline }) => {
  const skillsRequired = pipeline.skillsRequired.join(" | ");

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
            source={{ uri: pipeline.pipelineCoverPhoto }}
            style={styles.cardPhoto}
            resizeMode={"stretch"}
          />

          <ScrollView>
            <View style={styles.iconContainer}>
              <Image
                resizeMode={"contain"}
                source={{ uri: pipeline.branchInsignia }}
                style={styles.branchLogo}
              />
              <Image
                resizeMode={"contain"}
                source={{ uri: pipeline.unitInsignia }}
                style={styles.unitLogo}
              />
            </View>
            <Text style={styles.nickname}>{pipeline.nickname}</Text>
            <Text style={styles.name}>{pipeline.name}</Text>
            <Text style={styles.duration}>
              DURATION: {pipeline.duration} WEEKS
            </Text>
            <Text style={styles.skillsHeader}>Skills Required:</Text>
            <Text style={styles.skills}>{skillsRequired}</Text>

            <Text style={styles.description}>{pipeline.description}</Text>

            <Text style={styles.phaseHeader}>Phases:</Text>

            {pipeline.durationDetails.map((phase) => {
              return <DurationDetails phase={phase} key={phase._id} />;
            })}

            <Text style={styles.pstHeader}>Physical Screening Test</Text>

            {pipeline.workouts.map((workout) => {
              return <PSTCard workout={workout} key={workout._id} />;
            })}

            <Text style={styles.challengeHeader}>
              DO YOU HAVE WHAT IT TAKES?
            </Text>

            <Text style={styles.challengeDescription}>
              Select this pipeline to compare your scores against.
            </Text>

            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => toggleModal(true)}
            >
              <Text style={styles.viewButtonText}>Select Pipeline</Text>
            </TouchableOpacity>
            <Button
              style={styles.closeButton}
              title="Close"
              onPress={() => toggleModal(false)}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  challengeDescription: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    width: "75%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0,
  },
  durationContainer: {
    marginHorizontal: 20,
  },
  phaseTitle: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "700",
  },
  phaseFocus: {
    textAlign: "left",
    fontWeight: "500",
    marginVertical: 15,
  },
  phaseDuration: {
    textAlign: "left",
  },
  phaseDescription: {
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 40,
  },
  duration: {
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  skillsHeader: {
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  phaseHeader: {
    fontFamily: "SairaStencilOne_400Regular",
    color: "#000",
    fontSize: 36,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  challengeHeader: {
    fontFamily: "SairaStencilOne_400Regular",
    color: "#000",
    fontSize: 36,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
  },
  pstHeader: {
    fontFamily: "SairaStencilOne_400Regular",
    color: "#000",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 0,
  },
  skills: {
    color: "#444444",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  iconContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    width: "80%",
  },
  branchLogo: {
    height: 75,
    width: 75,
  },
  unitLogo: {
    height: 75,
    width: 100,
  },
  cardPhoto: {
    borderRadius: 7,
    width: "100%",
    height: 200,
  },
  nickname: {
    fontFamily: "SairaStencilOne_400Regular",
    fontSize: 36,
    textAlign: "center",
    paddingTop: 5,
  },
  name: {
    color: "#444444",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    width: "85%",
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
