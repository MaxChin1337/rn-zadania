import { View, Text, Pressable, Switch, StyleSheet } from 'react-native';

export default function SettingsRow({ label, description, value, onToggle, isSwitch, onPress, colors }) {
  return (
    <Pressable
      style={[styles.row, { borderColor: colors.border }]}
      onPress={onPress}
    >
      <View style={styles.left}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {description && (
          <Text style={[styles.desc, { color: colors.muted }]}>{description}</Text>
        )}
      </View>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#ccc', true: '#5c6bc0' }}
          thumbColor="#fff"
        />
      ) : (
        <Text style={[styles.arrow, { color: colors.muted }]}>›</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  left: { flex: 1, paddingRight: 12 },
  label: { fontSize: 15, fontWeight: '500' },
  desc: { fontSize: 12, marginTop: 2 },
  arrow: { fontSize: 22 },
});
