import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ResendTimerProps = {
  duration?: number;
  onResend?: () => void;
};

const ResendTimer: React.FC<ResendTimerProps> = ({ duration = 30, onResend }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(duration);
    onResend?.();
  };

  return (
    <>
      {timeLeft > 0 ? (
        <View style={styles.container}>
          <Text style={styles.text}>
            Didn’t recieve the OTP? Resend link in <Text style={{ fontWeight: "bold" }}>{timeLeft}s</Text>
          </Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.link}>
            Resend OTP
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 37,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4
  },
  text: {
    textAlign: "center",
    height: 21,
    lineHeight: 21,
    fontWeight: "400",
    fontSize: 14,
    letterSpacing: 0,
    color: "#66578F"
  },
  link: {
    color: "#66578F",
    textAlign: "center",
    marginTop: 16
  }
})

export default ResendTimer;
