import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { colors } from "../../assets";
import { Button, Gap } from "../../components/atoms";
import { getUsers } from '../../api'
import { AuthContext } from "../../components/context";

const SigninScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [creado, setCreado] = useState(false);

  const [isValidUser, setIsValidUser] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const { signUp } = useContext(AuthContext);
  const [correo, setCorreo] = useState([])

  useEffect(() => {
    obtenerUsuarios_losr();
  }, [])

  const obtenerUsuarios_losr = async () => {
    const rta = await getUsers()
    const correo = rta.map(user => user.email)
    setCorreo(correo)
  }

  const handleSignup = (username, email, password) => {
    /*const t = signUp(username, email, password);
    if (t != undefined) {
      setCreado(true);
      notifyMessage("Usuario creado correctamente");
      navigation.navigate("GetStarted");
    }*/
    const ced_ok = validar_ci_losr(username)
    const pass_ok = validar_pass_losr(password)
    const email_ok = validar_correo_losr(email)
    console.log('ced', ced_ok);
    console.log('pass', pass_ok);
    console.log('email', email_ok);
  };

  const validar_correo_losr = (email) => {
    const ok = correo.some(mail => mail === email);
    return !ok;
  }



  //validación de contraseña dentro de los parámetros requeridos
  function validar_pass_losr(entrada) {
    var myregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!.%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,10}$/;
    if (myregex.test(entrada)) {
      return true;
    } else {
      return false;
    }
  }
  //validación de cédula 
  function validar_ci_losr(str) {
    var tot = 0;
    var long = str.length;
    var longcheck = long - 1;
    var ok = false;
    if (str !== "" && long === 10) {
      for (let i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = str.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          tot += aux;
        } else {
          tot += parseInt(str.charAt(i));
        }
      }
      tot = tot % 10 ? 10 - (tot % 10) : 0;
      if (str.charAt(long - 1) == tot) {
        ok = true;
      } else {
        ok = false;
      }
    }
    return ok;
  }

  function notifyMessage(msg) {
    Alert.alert("Aviso", msg, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }

  return (
    <View>
      <Gap height={200} />
      <View style={styles.wrapperSlogan}>
        <Text style={styles.txtSlogan}>Crear Nuevo Usuario </Text>
      </View>

      <Gap height={60} />

      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        onChangeText={(text) => setUserName(text)}
      />

      <TextInput
        placeholder="Correo electronico"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        placeholder="Constraseña"
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      {isValidUser ? null : (
        <Text style={styles.errMsg}>Correo electrónico invalido</Text>
      )}

      <Gap height={60} />

      <Button
        onPress={() => {
          handleSignup(userName, email, password);
        }}
        text="Crear"
      />
    </View>
  );
};

export default SigninScreen;

// Styles

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20, justifyContent: "center" },
  wrapperSlogan: { marginTop: 51 },
  txtSlogan: {
    fontSize: 30,
    color: colors.primary,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 40,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  errMsg: {
    color: "red",
    paddingHorizontal: 20,
    marginHorizontal: 40,
  },
});
