import { useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../config/Firebase";

export default function VerifikasiScreen() {
  const [nik, setNik] = useState("");
  const router = useRouter();

  const handleVerifikasi = async () => {
    if (nik.length < 16) return Alert.alert("Error", "NIK harus 16 digit");
    await updateDoc(doc(db, "users", auth.currentUser.uid), { nik });
    Alert.alert("Berhasil", "Data tersimpan!");
    router.back();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Masukkan NIK 16 Digit"
        keyboardType="numeric"
        onChangeText={setNik}
        style={{
          borderWidth: 1,
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />
      <TouchableOpacity
        onPress={handleVerifikasi}
        style={{
          backgroundColor: "#FFBF00",
          padding: 15,
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Simpan NIK</Text>
      </TouchableOpacity>
    </View>
  );
}
