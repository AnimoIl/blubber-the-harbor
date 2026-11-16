import { useReducedMotion as useMotionPreference } from 'motion/react';

export default function useReducedMotion() {
  return Boolean(useMotionPreference());
}
