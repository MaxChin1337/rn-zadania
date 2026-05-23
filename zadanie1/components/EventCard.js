import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function EventCard({ item, onToggleFavorite, colors }) {
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.cardHeader}>
        <View style={styles.badges}>
          {item.isNew && (
            <View style={[styles.badge, styles.badgeNew]}>
              <Text style={styles.badgeText}>Nowe</Text>
            </View>
          )}
          {item.isPopular && (
            <View style={[styles.badge, styles.badgePopular]}>
              <Text style={styles.badgeText}>Popularne</Text>
            </View>
          )}
        </View>
        <Text style={[styles.category, { color: colors.accent }]}>{item.category}</Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.meta, { color: colors.muted }]}>
        {item.date} · {item.location}
      </Text>

      <Pressable
        style={[styles.favBtn, item.favorite && styles.favBtnActive]}
        onPress={() => onToggleFavorite(item.id)}
      >
        <Text style={[styles.favBtnText, item.favorite && styles.favBtnTextActive]}>
          {item.favorite ? '★ Ulubione' : '☆ Dodaj do ulubionych'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  badges: { flexDirection: 'row', gap: 6 },
  badge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  badgeNew: { backgroundColor: '#66bb6a' },
  badgePopular: { backgroundColor: '#ef5350' },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  category: { fontSize: 12, fontWeight: '600' },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  meta: { fontSize: 13, marginBottom: 10 },
  favBtn: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c5cae9',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  favBtnActive: { backgroundColor: '#fdd835', borderColor: '#fdd835' },
  favBtnText: { fontSize: 13, color: '#5c6bc0' },
  favBtnTextActive: { color: '#1a1a2e', fontWeight: '600' },
});
