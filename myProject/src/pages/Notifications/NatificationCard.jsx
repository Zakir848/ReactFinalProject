import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function NotificationCard({
  item,
  isEmployer,
  isOpen,
  onToggle,
  onStatusChange,
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 2.5,
        m: 2.5,
        boxShadow: 2,
        "&:hover": { boxShadow: 6 },
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
            {item.name?.[0]}
            {item.surname?.[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {item.name} {item.surname}
            </Typography>
            <Typography color="text.secondary">{item.email}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {isEmployer ? (
            item.status === "Pending" ? (
              <>
                <Button
                  sx={{
                    bgcolor: "success.main",
                    color: "success.contrastText",
                  }}
                  onClick={() => onStatusChange(item.id, "Accepted")}
                >
                  Accept
                </Button>
                <Button
                  sx={{ bgcolor: "error.main", color: "error.contrastText" }}
                  onClick={() => onStatusChange(item.id, "Rejected")}
                >
                  Reject
                </Button>
              </>
            ) : (
              <Chip
                label={item.status}
                color={item.status === "Accepted" ? "success" : "error"}
                size="small"
              />
            )
          ) : (
            // Worker yalnız statusu GÖRÜR, dəyişə bilmir
            <Chip
              label={item.status === "Pending" ? "Pending review" : item.status}
              color={
                item.status === "Accepted"
                  ? "success"
                  : item.status === "Rejected"
                    ? "error"
                    : "default"
              }
              size="small"
            />
          )}
        </Box>
      </Box>

      <Button variant="text" onClick={onToggle}>
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
            <Typography>
              {item.education}
              {" ("}
              {item.startYear} - {item.endYear}
              {")"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography fontWeight={600}>🌍 Languages:</Typography>
            <Stack direction="row" spacing={1}>
              {item.languages?.map((lang) => (
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
            💼 About
          </Typography>
          <Paper
            variant="outlined"
            sx={{ p: 2, bgcolor: "background.default", borderRadius: 2 }}
          >
            <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
              {item.description}
            </Typography>
          </Paper>
        </Stack>
      </Collapse>
    </Card>
  );
}
