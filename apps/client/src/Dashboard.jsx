import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: '15px'
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [chatId, setChatId] = useState(null)

  console.log(chatId)
  const handleOpen = async (e) => {
    const { currentTarget } = e;
    setChatId(currentTarget.getAttribute("user"))
    setOpen(true)
  }

  const handleClose = () => {
    setChatId(null)
    setOpen(false)
  };

  const handleDeleteUser = async () => {
    console.log(chatId)
    if(chatId !== null) {
      const res = await axios.post('/api/delete_user', { chatId })
      console.log(res.data)
      setUsers(users.filter(user => user.chatId !== Number(chatId)))
    }
    handleClose()
  }
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const res = await axios.get("/api/get_users");
        console.log(res.data);
        setUsers(res.data);
        setLoggedIn(true);
      }
    };
    getUsers().then().catch();
  }, []);

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "black"}}>
              Are you sure you want to delete this user
            </Typography>
            <Button onClick={handleDeleteUser}>Yes</Button>
          </Box>
        </Modal>
      </div>
      {isLoggedIn ? (
        <div>
          All subscribers
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Sub</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.chatId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.first_name} 
                  </TableCell>
                  <TableCell align="right">Yes</TableCell>
                  <TableCell align="right" >
                    <DeleteIcon sx={{ cursor: "pointer"}} user={user.chatId} onClick={handleOpen}/>
                  </TableCell>
                </TableRow>
              ))}
              {users.length < 1 && "no user found"}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      ) : (
        <div>Log in to access admin panel</div>
      )}
    </>
  );
};

export default Dashboard;
