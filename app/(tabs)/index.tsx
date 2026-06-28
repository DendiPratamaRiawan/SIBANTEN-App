import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Data berita
const newsData = [
  {
    id: "1",
    title: "Peresmian Fasilitas Publik Baru di Pusat Kota",
    date: "27 Juni 2026",
    image: "https://picsum.photos/400/200",
  },
  {
    id: "2",
    title: "Pendaftaran Bansos Tahap II Resmi Dibuka",
    date: "26 Juni 2026",
    image: "https://picsum.photos/401/200",
  },
  {
    id: "3",
    title: "Peringatan Dini Cuaca Ekstrem Wilayah Cilegon",
    date: "25 Juni 2026",
    image: "https://picsum.photos/402/200",
  },
];

export default function HomeScreen() {
  const menuItems = [
    { title: "Laporan", icon: "megaphone", color: "#FF9F43" },
    { title: "Kesehatan", icon: "medkit", color: "#54A0FF" },
    { title: "Keamanan", icon: "shield-checkmark", color: "#5F27CD" },
    { title: "Loker", icon: "briefcase", color: "#1DD1A1" },
    { title: "Peta", icon: "map", color: "#FF6B6B" },
    { title: "Darurat", icon: "call", color: "#EE5253" },
    { title: "Berita", icon: "newspaper", color: "#01A3A4" },
    {
      title: "Lainnya",
      icon: "apps",
      color: "#576574",
      onPress: () => Alert.alert("Layanan", "Fitur lainnya segera hadir!"),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Baru */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>SIBANTEN</Text>
          <Text style={styles.headerSubtitle}>Banten Digital Service</Text>
        </View>
        <Image
          source={require("../../assets/images/logoSIBANTEN.png")}
          style={styles.headerLogo}
        />
      </View>

      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <Text style={styles.heroTitle}>Info Penting!</Text>
        <Text style={styles.heroSub}>
          Pantau terus informasi terbaru melalui aplikasi SIBANTEN.
        </Text>
      </View>

      {/* Input Pencarian */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          placeholder="Cari layanan SIBANTEN..."
          style={styles.searchInput}
        />
      </View>

      {/* Grid Menu */}
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuCard}
            onPress={item.onPress}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={24} color="#FFF" />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Berita Terkini */}
      <Text style={styles.sectionTitle}>Berita Terkini</Text>
      <FlatList
        data={newsData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.newsCard}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.newsDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    backgroundColor: "#FFBF00",
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerContent: { flex: 1 },
  headerTitle: { fontSize: 26, fontWeight: "900", color: "#000" },
  headerSubtitle: { fontSize: 13, color: "#333", fontWeight: "600" },
  headerLogo: { width: 55, height: 55 },
  heroBanner: {
    backgroundColor: "#333",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    marginTop: -20,
    elevation: 5,
  },
  heroTitle: { color: "#FFBF00", fontWeight: "bold" },
  heroSub: { color: "#FFF", fontSize: 13 },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  menuCard: { width: "23%", alignItems: "center", marginBottom: 15 },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  menuText: { fontSize: 11, fontWeight: "600", color: "#444" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  newsCard: {
    width: 220,
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginLeft: 20,
    marginBottom: 20,
    elevation: 3,
  },
  newsImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  newsContent: { padding: 10 },
  newsTitle: { fontWeight: "bold", fontSize: 13 },
  newsDate: { fontSize: 11, color: "#999", marginTop: 5 },
});
