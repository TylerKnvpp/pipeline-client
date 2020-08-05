import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import PipelineCard from "./PipelineCard";
import PipelineModal from "./PipelineModal";

const PipelineScroller = ({ SairaStencilOne_400Regular, pipelines }) => {
  const [showModal, toggleModal] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState();

  const cardSelector = (input) => {
    setModalIndex(input);
  };

  if (showModal) {
    return (
      <PipelineModal
        pipeline={pipelines[modalIndex]}
        toggleModal={toggleModal}
      />
    );
  }

  if (pipelines) {
    return (
      <View style={styles.container}>
        {pipelines.length > 0 ? (
          <ScrollView scrollEnabled horizontal style={styles.cardScroll}>
            {pipelines.map((pipeline, index) => {
              return (
                <PipelineCard
                  cardSelector={cardSelector}
                  toggleModal={toggleModal}
                  index={index}
                  key={pipeline._id}
                  pipeline={pipeline}
                  SairaStencilOne_400Regular={SairaStencilOne_400Regular}
                />
              );
            })}
          </ScrollView>
        ) : (
          <Text>loading</Text>
        )}
      </View>
    );
  }

  return <Text>weird</Text>;
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    minWidth: "100%",
    paddingVertical: 30,
  },
  cardScroll: {
    flexDirection: "row",
    overflow: "scroll",
    marginLeft: 30,
  },
});

export default PipelineScroller;
