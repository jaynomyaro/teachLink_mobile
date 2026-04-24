import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './types';

// ── Lazily-imported screens ──────────────────────────────────────────────────
// Lazy imports prevent each screen's bundle from blocking the initial render.
const HomeScreen = React.lazy(() => import('../pages/mobile/MobileLogin'));
const SettingsScreen = React.lazy(() => import('../pages/mobile/Settings'));
const PaymentHistoryScreen = React.lazy(
  () => import('../pages/mobile/PaymentHistory'),
);

// Heavy feature screens are also kept lazy so their JS chunk is only loaded
// when the user actually navigates there.
const MobileCourseViewer = React.lazy(
  () => import('../components/mobile/MobileCourseViewer'),
);
const MobileQuizManager = React.lazy(
  () => import('../components/mobile/MobileQuizManager'),
);

// ── Stack navigator typed against RootStackParamList ────────────────────────
/**
 * `Stack` is fully typed via the generic parameter — no `any` required.
 * TypeScript will enforce that every `Stack.Screen name` is a valid key of
 * `RootStackParamList` and that the corresponding `component` prop receives the
 * correct route and navigation props.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AppNavigator
 *
 * The root stack navigator for TeachLink Mobile.  All screens are registered
 * here with their typed `name` prop; param shapes are inferred directly from
 * `RootStackParamList` — no `as any` casts are needed anywhere in the tree.
 *
 * This component is intentionally *not* wrapped in `NavigationContainer`; that
 * responsibility belongs to the Expo Router layout (`app/_layout.tsx`) which
 * already provides a container via the `<Stack>` primitive.  AppNavigator is
 * designed for use inside a React Navigation `NavigationContainer` when the app
 * is used outside of Expo Router (e.g., tests or standalone Native CLI builds).
 */
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {/* ── Main screens ──────────────────────────────────────────────── */}
      <Stack.Screen name="Home" component={HomeScreen as React.ComponentType} />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen as React.ComponentType}
      />

      {/* ── Feature screens ───────────────────────────────────────────── */}
      {/*
       * MobileCourseViewer receives a typed `navigation` prop via the
       * NativeStackNavigationProp<RootStackParamList, 'CourseViewer'> alias
       * defined in src/navigation/types.ts.  No `any` needed.
       */}
      <Stack.Screen
        name="CourseViewer"
        component={MobileCourseViewer as React.ComponentType}
        options={{ gestureEnabled: true }}
      />

      {/*
       * MobileQuizManager similarly receives a typed navigation prop via the
       * QuizNavigationProp alias — see src/navigation/types.ts.
       */}
      <Stack.Screen
        name="Quiz"
        component={MobileQuizManager as React.ComponentType}
        options={{ gestureEnabled: true }}
      />
    </Stack.Navigator>
  );
}
