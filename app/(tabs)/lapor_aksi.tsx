import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { db } from "../../config/Firebase";

export default function LaporAksiScreen() {
  const [jenisLaporan, setJenisLaporan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");
  const [region, setRegion] = useState({
    latitude: -6.0175,
    longitude: 106.0535,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  const kategoriList = [
    "Jalan Rusak",
    "Sampah",
    "Lampu PJU",
    "Banjir",
    "Fasilitas Umum",
    "Lainnya",
  ];

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${region.latitude},${region.longitude}`;
    Linking.openURL(url);
  };

  const handleKirim = async () => {
    if (!jenisLaporan || !lokasi || !deskripsi) {
      Alert.alert("Gagal", "Mohon lengkapi semua data laporan.");
      return;
    }

    try {
      await addDoc(collection(db, "laporan"), {
        jenis: jenisLaporan,
        lokasi: lokasi,
        deskripsi: deskripsi,
        foto: images,
        tanggal: new Date().toISOString(),
        status: "Diproses",
      });

      Alert.alert("Sukses", "Laporan sudah terkirim");
      setJenisLaporan("");
      setDeskripsi("");
      setLokasi("");
      setImages([]);
    } catch (error) {
      Alert.alert("Error", "Gagal mengirim laporan ke database.");
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buat Laporan</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Pilih Jenis Laporan</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.kategoriScroll}
        >
          {kategoriList.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.kategoriChip,
                jenisLaporan === item && styles.activeKategori,
              ]}
              onPress={() => setJenisLaporan(item)}
            >
              <Text
                style={
                  jenisLaporan === item
                    ? styles.activeText
                    : styles.kategoriText
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Lokasi Kejadian</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ketik manual atau klik lokasi..."
            value={lokasi}
            onChangeText={setLokasi}
          />
          <TouchableOpacity
            onPress={async () => {
              setLoadingLoc(true);
              let { status } =
                await Location.requestForegroundPermissionsAsync();
              if (status === "granted") {
                let pos = await Location.getCurrentPositionAsync({});
                setRegion({
                  ...region,
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                });
                setLokasi(
                  `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`,
                );
              }
              setLoadingLoc(false);
            }}
          >
            {loadingLoc ? (
              <ActivityIndicator size="small" color="#FFBF00" />
            ) : (
              <Ionicons name="location" size={24} color="#FFBF00" />
            )}
          </TouchableOpacity>
        </View>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          mapType={mapType}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        </MapView>

        {/* Kontrol Peta */}
        <View style={styles.mapControls}>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() =>
              setMapType((prev) =>
                prev === "standard" ? "satellite" : "standard",
              )
            }
          >
            <Ionicons name="layers" size={18} color="#003366" />
            <Text style={styles.controlText}>
              {mapType === "standard" ? "Satelit" : "Standar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={openInMaps}>
            <Ionicons name="navigate" size={18} color="#003366" />
            <Text style={styles.controlText}>Buka di Maps</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Deskripsi Detail</Text>
        <TextInput
          style={styles.inputArea}
          placeholder="Jelaskan detail kejadian..."
          multiline
          value={deskripsi}
          onChangeText={setDeskripsi}
        />

        <Text style={styles.label}>Lampirkan Foto ({images.length})</Text>
        <ScrollView horizontal style={{ marginBottom: 20 }}>
          {images.map((uri, idx) => (
            <Image key={idx} source={{ uri }} style={styles.imagePreview} />
          ))}
          <TouchableOpacity
            style={styles.addImageBtn}
            onPress={async () => {
              let res = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: true,
                selectionLimit: 5,
              });
              if (!res.canceled) setImages(res.assets.map((a) => a.uri));
            }}
          >
            <Ionicons name="camera" size={30} color="#CCC" />
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={styles.submitBtn} onPress={handleKirim}>
          <Text style={styles.submitText}>Kirim Laporan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    backgroundColor: "#FFBF00",
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  form: { padding: 20 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 10, color: "#333" },
  kategoriScroll: { marginBottom: 15 },
  kategoriChip: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  activeKategori: { backgroundColor: "#003366", borderColor: "#003366" },
  kategoriText: { color: "#555" },
  activeText: { color: "#FFF", fontWeight: "bold" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  input: { flex: 1, padding: 15 },
  map: { width: "100%", height: 200, borderRadius: 12, marginBottom: 10 },
  mapControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  controlBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    width: "48%",
    justifyContent: "center",
  },
  controlText: { marginLeft: 8, fontSize: 12, fontWeight: "600" },
  inputArea: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 15,
    height: 100,
    borderWidth: 1,
    borderColor: "#EEE",
    marginBottom: 15,
    textAlignVertical: "top",
  },
  imagePreview: { width: 90, height: 90, borderRadius: 12, marginRight: 10 },
  addImageBtn: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    backgroundColor: "#003366",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 50,
  },
  submitText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
