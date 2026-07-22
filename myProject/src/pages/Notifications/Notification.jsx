import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import NotificationCard from "./NatificationCard";
import { useContextFunc } from "../../context/JobContext";

export default function Notifications() {
  const {
    notifications,
    currentUser,
    vacancies,
    changeNotificationFromStatus,
  } = useContextFunc();
  const [expanded, setExpanded] = useState({});

  const isEmployer = currentUser?.role === "Employer";

  if (!currentUser) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <Typography color="text.secondary">
          Please sign in to view notifications.
        </Typography>
      </Box>
    );
  }

  const myNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const vacancy = vacancies.find((v) => v.id === notification.vacancyId);
      if (!vacancy) return false;
      return isEmployer
        ? vacancy.employerId === currentUser.id
        : notification.userId === currentUser.id;
    });
  }, [notifications, vacancies, currentUser]);

  const pendingCount = myNotifications.filter(
    (m) => m.status === "Pending",
  ).length;

  return (
    <Box
      sx={{
        maxWidth: 850,
        mx: "auto",
        py: 4,
        px: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h4" fontWeight={700}>
          My Notifications
        </Typography>
        <Chip
          color="primary"
          label={`${pendingCount} ${isEmployer ? "New" : "Pending"}`}
        />
      </Stack>

      {myNotifications.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            borderRadius: 3,
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Typography color="text.secondary">
            {isEmployer
              ? "No applications yet."
              : "You haven't applied to any vacancies yet."}
          </Typography>
        </Box>
      ) : (
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          {myNotifications.map((item) => (
            <NotificationCard
              key={item.id}
              item={item}
              isEmployer={isEmployer}
              isOpen={!!expanded[item.id]}
              onToggle={() =>
                setExpanded((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
              }
              onStatusChange={changeNotificationFromStatus}
            />
          ))}
        </Card>
      )}
    </Box>
  );
}
