import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../config/Firebase";

export default function AktivitasScreen() {
  const [laporan, setLaporan] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLaporan, setSelectedLaporan] = useState(null);

  const loadLaporan = async () => {
    setRefreshing(true);
    try {
      const q = query(collection(db, "laporan"), orderBy("tanggal", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLaporan(data);
      setFilteredData(data);
    } catch (e) {
      Alert.alert("Error", "Gagal memuat data.");
    }
    setRefreshing(false);
  };

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString("id-ID");
      const newData = laporan.filter(
        (item) =>
          new Date(item.tanggal).toLocaleDateString("id-ID") === formattedDate,
      );
      setFilteredData(newData);
    }
  };

  const batalkanLaporan = async (id) => {
    try {
      await deleteDoc(doc(db, "laporan", id));
      Alert.alert("Sukses", "Laporan berhasil dibatalkan");
      setModalVisible(false);
      loadLaporan();
    } catch (e) {
      Alert.alert("Error", "Gagal membatalkan laporan.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadLaporan();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aktivitas Saya</Text>
      </View>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setShowPicker(true)}
      >
        <Ionicons name="calendar" size={20} color="#003366" />
        <Text style={styles.filterText}>
          Filter Tanggal: {date.toLocaleDateString("id-ID")}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadLaporan} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedLaporan(item);
              setModalVisible(true);
            }}
          >
            {item.foto && item.foto.length > 0 ? (
              <Image source={{ uri: item.foto[0] }} style={styles.thumbnail} />
            ) : (
              <View style={styles.noImage}>
                <Ionicons name="image" size={30} color="#CCC" />
              </View>
            )}
            <View style={styles.cardCenter}>
              <Text style={styles.jenis}>{item.jenis}</Text>
              <Text style={styles.lokasi}>📍 {item.lokasi}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detail Laporan</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={28} color="#999" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.label}>Jenis Laporan</Text>
              <Text style={styles.value}>{selectedLaporan?.jenis}</Text>
              <Text style={styles.label}>Lokasi</Text>
              <Text style={styles.value}>{selectedLaporan?.lokasi}</Text>
              <Text style={styles.label}>Deskripsi</Text>
              <Text style={styles.descText}>{selectedLaporan?.deskripsi}</Text>
            </View>

            {selectedLaporan?.foto && selectedLaporan.foto.length > 0 && (
              <FlatList
                horizontal
                data={selectedLaporan.foto}
                keyExtractor={(item, i) => i.toString()}
                renderItem={({ item }) => (
                  <Image source={{ uri: item }} style={styles.fullImage} />
                )}
                style={{ marginBottom: 20 }}
              />
            )}

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() =>
                Alert.alert("Konfirmasi", "Batalkan laporan ini?", [
                  { text: "Tidak" },
                  {
                    text: "Ya, Batalkan",
                    onPress: () => batalkanLaporan(selectedLaporan?.id),
                  },
                ])
              }
            >
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                Batalkan Laporan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7F6" },
  header: {
    backgroundColor: "#FFBF00",
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#003366" },
  filterButton: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    margin: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  filterText: { marginLeft: 10, fontWeight: "600", color: "#003366" },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 15,
    alignItems: "center",
  },
  cardCenter: { flex: 1, marginLeft: 15 },
  thumbnail: { width: 70, height: 70, borderRadius: 15 },
  noImage: {
    width: 70,
    height: 70,
    borderRadius: 15,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },
  jenis: { fontWeight: "bold", fontSize: 16, color: "#003366" },
  lokasi: { fontSize: 12, color: "#666" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: { backgroundColor: "#FFF", padding: 20, borderRadius: 20 },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold" },
  infoCard: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  label: { fontSize: 12, color: "#888" },
  value: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 10 },
  descText: { fontSize: 14, color: "#555", lineHeight: 20 },
  fullImage: { width: 120, height: 120, borderRadius: 15, marginRight: 10 },
  cancelBtn: {
    backgroundColor: "#D9534F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
