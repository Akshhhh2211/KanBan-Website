import React, { useEffect, useState } from "react";
import axios from "axios";
import Board from "./Components/Board/Board";
import "./App.css";
import { Sliders } from "react-feather";
function App() {
  const [apiData, setApiData] = useState(null);
  const [, setLoading ] = useState(true); // Define the loading state variable
  const [boards, setBoards] = useState([]);
  const [groupingOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Fetch data from the Quicksell API
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        const apiData = response.data;
        setApiData(apiData); // Fix the usage of setApiData
        setLoading(false);
        console.log("API Data:", apiData);

        // Process the API data and group them into boards based on status and priority
        const groupedBoards = groupDataIntoBoards(apiData);
        setBoards(groupedBoards);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
      // eslint-disable-next-line
  },[]);

  // Function to group API data into boards based on status, user and priority
  const groupDataIntoBoards = (apiData) => {
    if (!apiData) return [];

    const boardsByStatus = groupDataByStatus(apiData);
    const boardsByUser = groupDataByUser(apiData); 
    const boardsByPriority = groupDataByPriority(apiData);

    // Combine boards based on the selected grouping option
    let combinedBoards = [];
    if (groupingOption === "status") {
      combinedBoards = boardsByStatus;
    } else if (groupingOption === "user") {
      combinedBoards = boardsByUser;
    } else if (groupingOption === "priority") {
      combinedBoards = boardsByPriority;
    }

    return combinedBoards;
  };

  // Define grouping status
  const groupDataByStatus = (apiData) => {
    const boardsByStatus = {};
    apiData.tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!boardsByStatus[status]) {
        boardsByStatus[status] = {
          title: status,
          cards: [],
        };
      }
      boardsByStatus[status].cards.push(ticket);
    });
    return Object.values(boardsByStatus);
  };
  // Define grouping user
  const groupDataByUser = (apiData) => {
    const boardsByUser = {};
    apiData.tickets.forEach((ticket) => {
      const user = apiData.users.find((u) => u.id === ticket.userId);
      if (user) {
        const username = user.name;
        if (!boardsByUser[username]) {
          boardsByUser[username] = {
            title: username,
            cards: [],
          };
        }
        boardsByUser[username].cards.push(ticket);
      }
    });
    return Object.values(boardsByUser);
  };

    // Define grouping priority
    const groupDataByPriority = (apiData) => {
      const boardsByPriority = {};
      apiData.tickets.forEach((ticket) => {
        const priority = ticket.priority;
        if (!boardsByPriority[priority]) {
          boardsByPriority[priority] = {
            title: `Priority ${priority}`,
            cards: [],
          };
        }
        boardsByPriority[priority].cards.push(ticket);
      });
      return Object.values(boardsByPriority);
    };

     // Define grouping by Title (Ascending)
    const orderDatabyAscending = (apiData) => {
     const boardsByTitle = {};
      const sortedData = [...apiData.tickets].sort((a, b) => a.title.localeCompare(b.title));
    sortedData.forEach((ticket) => {
    const title = ticket.title;
    if (!boardsByTitle[title]) {
      boardsByTitle[title] = {
        title: title,
        cards: [],
      };
    }
    boardsByTitle[title].cards.push(ticket);
  });

  return Object.values(boardsByTitle);
};

 const orderDatabyDescending = (apiData) => {
    const boardsByPriority = {};
    const sortedData = [...apiData.tickets].sort((a, b) => b.priority - a.priority);
  
    sortedData.forEach((ticket) => {
      const priority = ticket.priority;
      if (!boardsByPriority[priority]) {
        boardsByPriority[priority] = {
          title: `Priority ${priority}`,
          cards: [],
        };
      }
      boardsByPriority[priority].cards.push(ticket);
    });
  
    return Object.values(boardsByPriority);
  };
    const handleOptionChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
  
      // Call the function associated with the selected option
      if (selectedValue === 'option1-1') {
        const groupedBoards = groupDataByStatus(apiData);
        setBoards(groupedBoards);
      } else if (selectedValue === 'option1-2') {
        const groupedBoards = groupDataByUser(apiData);
        setBoards(groupedBoards);
      } else if (selectedValue === 'option1-3') {
        const groupedBoards = groupDataByPriority(apiData);
        setBoards(groupedBoards);
      } else if (selectedValue === 'option2-1') {
        const groupedBoards = orderDatabyDescending(apiData);
        setBoards(groupedBoards);
      } else if (selectedValue === 'option2-2') {
        const groupedBoards = orderDatabyAscending(apiData);
        setBoards(groupedBoards);
      }
    };

  return (
    <div className="app">
      <div className="app_nav">
      <select value={selectedOption} onChange={handleOptionChange} style={{ width: '150px' }}>
      <option value=""><Sliders size={12} />Display</option>
      <optgroup label="Grouping">
        <option value="option1-1">Status</option>
        <option value="option1-2">User</option>
        <option value="option1-3">Priority</option>
      </optgroup>
      <optgroup label="Ordering">
        <option value="option2-1">Priority</option>
        <option value="option2-2">Title</option>
      </optgroup>
    </select>
      </div>
      <div className="app_boards_container">
        <div className="app_boards">
          {boards.map((board, index) => (
            <Board key={index} board={board} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
