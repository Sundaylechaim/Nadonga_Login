import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");


  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const [items, setItems] = useState([]);
    const [newItem, setnewItem] = useState("");
  
    // Fetch all items from API
    useEffect(() => {
      axios.get(API_URL)
        .then(response => {
          setItems(response.data)})
        .catch(error => {
          console.log("Error fetching items: ", error);
        });
    }, []);
  
    // Add a new item
    const addItem = () => {
      axios.post(API_URL, {name: newItem})
        .then(response => {
          setItems([...items, response.data]);
          setnewItem(""); // Clear the input field after adding the item
        })
        .catch(error => {
          console.log("Error adding item: ", error);
        });
    };
  
    // update an item
    const updateItem = (id, name) => {
      axios.put(`${API_URL}/${id}`, {name})
        .then(response => {
          const newItems = items.map(item => item.id === id ? response.data : item);
          setItems(newItems);
        })
        .catch(error => {
          console.log("Error updating item: ", error);
        });
    }
  
    // Delete an item
    const deleteItem = (id) => {
      axios.delete(`${API_URL}/${id}`)
        .then(() => {
          const newItems = items.filter(item => item.id !== id);
          setItems(newItems);
        })
        .catch(error => {
          console.log("Error deleting item: ", error);
        });
  }

  

  return (    
    <Container>
      <Typography variant="h4">Welcome {user}</Typography>
      <h1>Add Item</h1>
    <input type="text" value={newItem} onChange={e => setnewItem(e.target.value)} />
    <button onClick={addItem}>Add Item</button>
    <h1>Items</h1>
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <input type="text" value={item.name} onChange={(e) => updateItem(item.id, e.target.value)}/>
          <button onClick={() => deleteItem(item.id)}>Delete Item</button>

        </li>

      ))}
    </ul>
    <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;