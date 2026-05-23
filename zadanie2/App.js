import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import SettingsRow from './components/SettingsRow';

const BIO_LIMIT = 150;

const initialProfile = {
  firstName: 'Maks',
  email: 'maxchin1.mc@gmail.com',
  city: 'Jaworzno',
  bio: 'Student informatyki, pasjonat programowania.',
};

export default function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [loggedOut, setLoggedOut] = useState(false);

  const colors = darkMode ? dark : light;

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Imię nie może być puste.';
    if (!form.email.includes('@')) e.email = 'E-mail musi zawierać znak @.';
    if (form.bio.length > BIO_LIMIT) e.bio = `Bio nie może przekraczać ${BIO_LIMIT} znaków.`;
    return e;
  };

  const handleSave = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setProfile(form);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus('error');
    }
  };

  if (loggedOut) {
    return (
      <SafeAreaView style={[styles.safe, styles.centered, { backgroundColor: colors.bg }]}>
        <Text style={[styles.loggedOutText, { color: colors.text }]}>Wylogowano pomyślnie.</Text>
        <Pressable style={styles.loginBtn} onPress={() => setLoggedOut(false)}>
          <Text style={styles.loginBtnText}>Zaloguj się ponownie</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerTitle, { color: colors.headerText }]}>Panel użytkownika</Text>
            <Pressable onPress={() => setDarkMode(d => !d)}>
              <Text style={{ fontSize: 22 }}>{darkMode ? '☀️' : '🌙'}</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
            <Text style={styles.avatarText}>{profile.firstName[0].toUpperCase()}</Text>
          </View>
          <Text style={[styles.profileName, { color: colors.text }]}>{profile.firstName}</Text>
          <Text style={[styles.profileMeta, { color: colors.muted }]}>{profile.city}</Text>
          <Text style={[styles.profileBio, { color: colors.muted }]}>{profile.bio}</Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Edytuj dane</Text>

          <Text style={[styles.fieldLabel, { color: colors.muted }]}>Imię</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: errors.firstName ? '#ef5350' : colors.border }]}
            value={form.firstName}
            onChangeText={v => setForm(f => ({ ...f, firstName: v }))}
            placeholder="Imię"
            placeholderTextColor={colors.muted}
          />
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

          <Text style={[styles.fieldLabel, { color: colors.muted }]}>E-mail</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: errors.email ? '#ef5350' : colors.border }]}
            value={form.email}
            onChangeText={v => setForm(f => ({ ...f, email: v }))}
            placeholder="E-mail"
            placeholderTextColor={colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={[styles.fieldLabel, { color: colors.muted }]}>Miasto</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
            value={form.city}
            onChangeText={v => setForm(f => ({ ...f, city: v }))}
            placeholder="Miasto"
            placeholderTextColor={colors.muted}
          />

          <View style={styles.bioLabelRow}>
            <Text style={[styles.fieldLabel, { color: colors.muted }]}>Bio</Text>
            <Text style={[styles.bioCounter, { color: form.bio.length > BIO_LIMIT ? '#ef5350' : colors.muted }]}>
              {form.bio.length}/{BIO_LIMIT}
            </Text>
          </View>
          <TextInput
            style={[styles.input, styles.bioInput, { backgroundColor: colors.inputBg, color: colors.text, borderColor: errors.bio ? '#ef5350' : colors.border }]}
            value={form.bio}
            onChangeText={v => setForm(f => ({ ...f, bio: v }))}
            placeholder="Napisz coś o sobie..."
            placeholderTextColor={colors.muted}
            multiline
          />
          {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}

          <Text style={[styles.fieldLabel, { color: colors.muted }]}>Hasło</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, styles.passwordInput, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
              value={password}
              onChangeText={setPassword}
              placeholder="Nowe hasło"
              placeholderTextColor={colors.muted}
              secureTextEntry={!showPassword}
            />
            <Pressable
              style={[styles.showBtn, { borderColor: colors.border, backgroundColor: colors.inputBg }]}
              onPress={() => setShowPassword(s => !s)}
            >
              <Text style={{ color: colors.muted, fontSize: 13 }}>{showPassword ? 'Ukryj' : 'Pokaż'}</Text>
            </Pressable>
          </View>

          {saveStatus === 'success' && (
            <View style={styles.successMsg}>
              <Text style={styles.successText}>Dane zapisane pomyślnie.</Text>
            </View>
          )}
          {saveStatus === 'error' && (
            <View style={styles.errorMsg}>
              <Text style={styles.errorMsgText}>Popraw błędy przed zapisaniem.</Text>
            </View>
          )}

          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Zapisz zmiany</Text>
          </Pressable>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Ustawienia</Text>
          <SettingsRow
            label="Powiadomienia"
            description="Otrzymuj powiadomienia o nowych wydarzeniach"
            value={notifications}
            onToggle={setNotifications}
            isSwitch
            colors={colors}
          />
          <SettingsRow
            label="Prywatność"
            description="Ukryj profil przed innymi użytkownikami"
            value={privacy}
            onToggle={setPrivacy}
            isSwitch
            colors={colors}
          />
          <SettingsRow
            label="Ciemny motyw"
            description="Przełącz między trybem jasnym i ciemnym"
            value={darkMode}
            onToggle={setDarkMode}
            isSwitch
            colors={colors}
          />
          <SettingsRow
            label="O aplikacji"
            description="Wersja 1.0.0 — Zadanie React Native"
            isSwitch={false}
            onPress={() => {}}
            colors={colors}
          />
        </View>

        <View style={styles.logoutSection}>
          <Pressable style={styles.logoutBtn} onPress={() => setLoggedOut(true)}>
            <Text style={styles.logoutText}>Wyloguj się</Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const light = {
  bg: '#f4f4f8',
  card: '#ffffff',
  border: '#e0e0e0',
  inputBg: '#f8f8fc',
  text: '#1a1a2e',
  muted: '#888',
  accent: '#5c6bc0',
  headerBg: '#5c6bc0',
  headerText: '#ffffff',
};

const dark = {
  bg: '#0f0f1a',
  card: '#1e1e30',
  border: '#2e2e45',
  inputBg: '#151525',
  text: '#e8e8f0',
  muted: '#7070a0',
  accent: '#9fa8da',
  headerBg: '#1e1e30',
  headerText: '#e8e8f0',
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  centered: { justifyContent: 'center', alignItems: 'center' },
  scroll: { paddingBottom: 40 },
  header: { paddingHorizontal: 16, paddingVertical: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  profileCard: {
    margin: 16,
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: '#fff' },
  profileName: { fontSize: 20, fontWeight: '700', marginBottom: 2 },
  profileMeta: { fontSize: 14, marginBottom: 8 },
  profileBio: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 14 },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 8,
  },
  bioLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bioCounter: { fontSize: 12, marginBottom: 4 },
  bioInput: { height: 80, textAlignVertical: 'top' },
  passwordRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  passwordInput: { flex: 1, marginBottom: 0 },
  showBtn: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  errorText: { color: '#ef5350', fontSize: 12, marginTop: -4, marginBottom: 8 },
  successMsg: { backgroundColor: '#e8f5e9', borderRadius: 8, padding: 10, marginBottom: 10 },
  successText: { color: '#2e7d32', fontSize: 14 },
  errorMsg: { backgroundColor: '#ffebee', borderRadius: 8, padding: 10, marginBottom: 10 },
  errorMsgText: { color: '#c62828', fontSize: 14 },
  saveBtn: {
    backgroundColor: '#5c6bc0',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  logoutSection: { marginHorizontal: 16 },
  logoutBtn: {
    backgroundColor: '#ef5350',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  loggedOutText: { fontSize: 18, marginBottom: 20 },
  loginBtn: {
    backgroundColor: '#5c6bc0',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  loginBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
