import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#efefef",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#AA2200",
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  result: {
    fontSize: 18,
    color: "#222",
    marginTop: 10,
    textAlign: "center"
  }
});

export default function App() {
  const [mensal, setMensal] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [juros, setJuros] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularMontantes = () => {
    const mensalFloat = parseFloat(mensal.replace(",", "."));
    const t = parseInt(parcelas);
    const i = parseFloat(juros.replace(",", ".")) / 100;

    if (isNaN(mensalFloat) || isNaN(t) || isNaN(i) || t <= 0) {
      setResultado("Preencha todos os campos corretamente.");
      return;
    }

    const montanteS = mensalFloat * t;

    let montanteR = 0;
    for (let j = 1; j <= t; j++) {
      montanteR = montanteR + montanteR * i + mensalFloat;
    }

    setResultado(
      `Montante simples (sem juros): R$ ${montanteS.toFixed(2)}\n` +
      `Montante real (com juros mensal): R$ ${montanteR.toFixed(2)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Investimentos</Text>

      <TextInput
        placeholder="Valor da parcela mensal (R$)"
        style={styles.input}
        keyboardType="numeric"
        value={mensal}
        onChangeText={setMensal}
      />
      <TextInput
        placeholder="Número de parcelas"
        style={styles.input}
        keyboardType="numeric"
        value={parcelas}
        onChangeText={setParcelas}
      />
      <TextInput
        placeholder="Taxa de juros mensal (%)"
        style={styles.input}
        keyboardType="numeric"
        value={juros}
        onChangeText={setJuros}
      />

      <Button title="Calcular" onPress={calcularMontantes} />

      {resultado !== "" && <Text style={styles.result}>{resultado}</Text>}
    </View>
  );
}
