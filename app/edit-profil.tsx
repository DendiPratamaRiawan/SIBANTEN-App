import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { auth, db } from "../config/Firebase";

export default function EditProfilScreen() {
  const [nama, setNama] = useState(auth.currentUser?.displayName || "");
  const [image, setImage] = useState(auth.currentUser?.photoURL || null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSimpan = async () => {
    setLoading(true);
    try {
      // Catatan: Jika ingin simpan foto permanen, gunakan Firebase Storage.
      // Di sini kita simpan URI sementara ke profile (atau link url dari Storage nantinya)
      await updateProfile(auth.currentUser, {
        displayName: nama,
        photoURL: image,
      });

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        nama: nama,
        photoURL: image,
      });

      Alert.alert("Sukses", "Profil diperbarui!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="camera" size={40} color="#FFF" />
          </View>
        )}
        <View style={styles.editBadge}>
          <Ionicons name="pencil" size={16} color="#FFF" />
        </View>
      </TouchableOpacity>

      <Text style={styles.label}>Nama Lengkap</Text>
      <TextInput style={styles.input} value={nama} onChangeText={setNama} />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSimpan}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Simpan Perubahan</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#F8F9FA" },
  avatarWrapper: {
    alignSelf: "center",
    marginBottom: 30,
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#FFBF00",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#003366",
    justifyContent: "center",
    alignItems: "center",
  },
  editBadge: {
    position: "absolute",
    right: 0,
    bottom: 5,
    backgroundColor: "#FFBF00",
    padding: 8,
    borderRadius: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EEE",
    fontSize: 16,
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#003366",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
