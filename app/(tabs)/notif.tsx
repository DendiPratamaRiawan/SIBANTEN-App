import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../../config/Firebase";

export default function NotifikasiScreen() {
  const [notifikasi, setNotifikasi] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotifikasi = async () => {
    setRefreshing(true);
    try {
      // Mengambil notifikasi (asumsi ada collection 'notifikasi')
      const q = query(
        collection(db, "notifikasi"),
        orderBy("timestamp", "desc"),
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifikasi(data);
    } catch (e) {
      console.error("Gagal memuat notifikasi:", e);
    }
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadNotifikasi();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pemberitahuan</Text>
      </View>

      <FlatList
        data={notifikasi}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadNotifikasi} />
        }
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada notifikasi baru.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notifCard}>
            <View style={styles.iconBox}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FFBF00"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.judul}</Text>
              <Text style={styles.message}>{item.pesan}</Text>
              <Text style={styles.date}>
                {item.timestamp
                  ? new Date(item.timestamp.seconds * 1000).toLocaleDateString(
                      "id-ID",
                    )
                  : ""}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  listContainer: { padding: 20 },
  notifCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 12,
    borderRadius: 15,
    alignItems: "center",
    elevation: 2,
  },
  iconBox: {
    backgroundColor: "#FFF3CD",
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: "bold", color: "#003366" },
  message: { fontSize: 13, color: "#666", marginTop: 2 },
  date: { fontSize: 11, color: "#AAA", marginTop: 5 },
  emptyText: { textAlign: "center", marginTop: 50, color: "#999" },
});
