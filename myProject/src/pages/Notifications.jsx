import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useContextFunc } from "../context/JobContext";

export default function Notifications() {
  const {
    notifications,
    currentUser,
    vacancies,
    changeNotificationFromStatus,
  } = useContextFunc();
  const [expanded, setExpanded] = useState({});

  const myNotifications = notifications.filter((notification) => {
    const vacancy = vacancies.find(
      (vacancy) =>
        vacancy.id === notification.vacancyId &&
        vacancy.employerId === currentUser.id,
    );

    return vacancy;
  });
  console.log(myNotifications);

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
          Notifications
        </Typography>

        <Chip
          color="primary"
          label={`${myNotifications.filter((m) => m.unread === false).length} New`}
        />
      </Stack>

      <Card elevation={2} sx={{ borderRadius: 3 }}>
        {myNotifications.map((item) => {
          const isOpen = expanded[item.id];

          return (
            <React.Fragment key={item.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  p: 2.5,
                  m: 2.5,
                  boxShadow: 2,
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: "primary.main",
                        fontWeight: 700,
                      }}
                    >
                      {item.name[0]}
                      {item.surname[0]}
                    </Avatar>

                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        {item.name} {item.surname}
                      </Typography>

                      <Typography color="text.secondary">
                        {item.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Chip label="New" color="primary" />
                </Box>

                <Button
                  variant="text"
                  onClick={async () => {
                    await changeNotificationFromStatus(item.id);
                    setExpanded((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id],
                    }));
                  }}
                >
                  {isOpen ? "Show Less" : "Show More"}
                </Button>

                <Collapse in={isOpen}>
                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={1.5}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography fontWeight={600}>📞 Phone:</Typography>
                      <Typography>{item.phone}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography fontWeight={600}>📍 Address:</Typography>
                      <Typography>{item.address}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography fontWeight={600}>🎓 Education:</Typography>
                      <Typography>{item.education}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Typography fontWeight={600}>🌍 Languages:</Typography>

                      <Stack direction="row" spacing={1}>
                        {item.languages.map((lang) => (
                          <Chip
                            key={lang}
                            label={lang}
                            size="small"
                            color="info"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>

                    <Typography variant="subtitle1" fontWeight={700}>
                      💼 About Candidate
                    </Typography>

                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        bgcolor: "grey.100",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          whiteSpace: "pre-wrap",
                          lineHeight: 1.8,
                          color: "black",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Paper>
                  </Stack>
                </Collapse>
              </Card>
            </React.Fragment>
          );
        })}
      </Card>
    </Box>
  );
}
