import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import EventCard from './components/EventCard';

const EVENTS = [
  { id: '1', title: 'Hackathon AI 2025', date: '2025-06-10', category: 'Nauka', location: 'Kraków', favorite: false, isNew: true, isPopular: false },
  { id: '2', title: 'Maraton Silesia', date: '2025-06-15', category: 'Sport', location: 'Katowice', favorite: false, isNew: false, isPopular: true },
  { id: '3', title: 'Jazz Night Festival', date: '2025-06-20', category: 'Muzyka', location: 'Warszawa', favorite: false, isNew: true, isPopular: true },
  { id: '4', title: 'Premiera: Dune 3', date: '2025-06-25', category: 'Film', location: 'Jaworzno', favorite: false, isNew: false, isPopular: false },
  { id: '5', title: 'Warsztaty React Native', date: '2025-07-01', category: 'Nauka', location: 'Gliwice', favorite: false, isNew: true, isPopular: false },
  { id: '6', title: 'Turniej tenisowy', date: '2025-07-05', category: 'Sport', location: 'Sosnowiec', favorite: false, isNew: false, isPopular: true },
  { id: '7', title: 'Koncert Roxette Revival', date: '2025-07-10', category: 'Muzyka', location: 'Wrocław', favorite: false, isNew: false, isPopular: true },
  { id: '8', title: 'Noc Filmowa — Hitchcock', date: '2025-07-15', category: 'Film', location: 'Jaworzno', favorite: false, isNew: true, isPopular: false },
];

const CATEGORIES = ['Wszystkie', 'Nauka', 'Sport', 'Muzyka', 'Film'];

export default function App() {
  const [events, setEvents] = useState(EVENTS);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const colors = darkMode ? dark : light;

  const toggleFavorite = (id) => {
    setEvents(prev =>
      prev.map(e => e.id === id ? { ...e, favorite: !e.favorite } : e)
    );
  };

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'Wszystkie' || e.category === activeCategory;
    const matchFav = onlyFavorites ? e.favorite : true;
    return matchSearch && matchCategory && matchFav;
  });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.headerText }]}>Katalog wydarzeń</Text>
            <Text style={[styles.headerSub, { color: colors.headerMuted }]}>Znajdź coś dla siebie</Text>
          </View>
          <Pressable onPress={() => setDarkMode(d => !d)} style={styles.themeBtn}>
            <Text style={styles.themeBtnText}>{darkMode ? '☀️' : '🌙'}</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.searchWrap, { backgroundColor: colors.bg }]}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
          placeholder="Szukaj wydarzeń..."
          placeholderTextColor={colors.muted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={[styles.filtersWrap, { backgroundColor: colors.bg }]}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.chip, activeCategory === item && styles.chipActive]}
              onPress={() => setActiveCategory(item)}
            >
              <Text style={[styles.chipText, activeCategory === item && styles.chipTextActive]}>
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      <View style={[styles.toolbar, { backgroundColor: colors.bg }]}>
        <Text style={[styles.count, { color: colors.muted }]}>Wyniki: {filtered.length}</Text>
        <Pressable
          style={[styles.favToggle, onlyFavorites && styles.favToggleActive]}
          onPress={() => setOnlyFavorites(f => !f)}
        >
          <Text style={[styles.favToggleText, onlyFavorites && styles.favToggleTextActive]}>
            ★ Tylko ulubione
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <EventCard item={item} onToggleFavorite={toggleFavorite} colors={colors} />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>Brak wyników</Text>
        }
      />
    </SafeAreaView>
  );
}

const light = {
  bg: '#f4f4f8',
  card: '#ffffff',
  border: '#e0e0e0',
  text: '#1a1a2e',
  muted: '#888',
  accent: '#5c6bc0',
  headerBg: '#5c6bc0',
  headerText: '#ffffff',
  headerMuted: '#c5cae9',
};

const dark = {
  bg: '#0f0f1a',
  card: '#1e1e30',
  border: '#2e2e45',
  text: '#e8e8f0',
  muted: '#7070a0',
  accent: '#9fa8da',
  headerBg: '#1e1e30',
  headerText: '#e8e8f0',
  headerMuted: '#7070a0',
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: 16, paddingVertical: 14 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSub: { fontSize: 13, marginTop: 2 },
  themeBtn: { padding: 8 },
  themeBtnText: { fontSize: 20 },
  searchWrap: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  filtersWrap: { paddingLeft: 16, paddingVertical: 8 },
  chip: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c5cae9',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  chipActive: { backgroundColor: '#5c6bc0', borderColor: '#5c6bc0' },
  chipText: { fontSize: 13, color: '#5c6bc0' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  count: { fontSize: 13 },
  favToggle: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c5cae9',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  favToggleActive: { backgroundColor: '#fdd835', borderColor: '#fdd835' },
  favToggleText: { fontSize: 13, color: '#888' },
  favToggleTextActive: { color: '#1a1a2e', fontWeight: '600' },
  list: { padding: 16, gap: 12 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 15 },
});
