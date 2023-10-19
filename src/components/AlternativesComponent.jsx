import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

const Alternatives = ({ evaluator, disabled, correctAlternative }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const verify = (value) => {
    console.log("Presionaste la alternativa ", value);
    evaluator(value);
    setSelectedOption(value); // Establece la opción seleccionada
  };

  useEffect(() => {
    if(!disabled){
      setSelectedOption(null); // Reiniciar el estado cuando cambia la pregunta
    }

  }, [disabled]);

  return (
    <View style={tw`flex-row h-14 items-center justify-between`}>
      {["A", "B", "C", "D", "E"].map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.buttonContainer,
            selectedOption === option ? selectedOption === correctAlternative? styles.selectedCorrect: styles.selectedIncorrect : null,
          ]}
          onPress={() => {
            verify(option);
          }}
          disabled = {disabled}
        >
          <View style={styles.circle}>
            {selectedOption === option ? 
              selectedOption === correctAlternative? <Text style={styles.check}>✓</Text>: <Text style={styles.check}>✗</Text>  : <Text style={styles.buttonText}>{option}</Text>}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Alternatives;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "16%",
    height: 35,
    backgroundColor: "#87CEEB",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  selectedCorrect: {
    backgroundColor: "green", // Cambia el color al seleccionar
  },
  selectedIncorrect:{
    backgroundColor: "red",
  },

  circle: {
    width: 23,
    height: 23,
    backgroundColor: "transparent",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  check: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18, // Ajusta el tamaño del check
  },
});
