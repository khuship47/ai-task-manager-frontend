import { AppBar, Toolbar, Typography, Button, Box, Avatar} from "@mui/material";

const Header = ({ user, onLogout }) => {
  return (
    <AppBar position="static" elevation={2} sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            
            <Typography variant="h6" sx={{ fontWeight: 600 }}> AI Task Manager</Typography>

            {/* Right: User + Logout */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: "14px" }}> {user?.email}</Typography>
                <Avatar sx={{ width: 32, height: 32 }}> {user?.email?.[0]?.toUpperCase()}</Avatar>
                <Button
                    color="inherit"
                    onClick={onLogout}
                    sx={{ textTransform: "none", fontWeight: 500 }}
                >
                    Logout
                </Button>
            </Box>

        </Toolbar>
    </AppBar>
  );
}

export default Header;