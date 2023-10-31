import React, { useEffect, useState } from "react";
import axios from "axios";
import Board from "./Components/Board/Board";
import DropdownMenu from "./Components/dropdownmenu/drowndownmenu";
import "./App.css";
function App() {
  const [apiData, setApiData] = useState(null);
  const [setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const [groupingOption, setGroupingOption] = useState("");
  const [orderingOption, setOrderingOption] = useState("")

  useEffect(() => {
    // Fetch data from the Quicksell API
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        const apiData = response.data;
        setApiData(apiData, apiData);
        setLoading(false);
        console.log("API Data:", apiData);

        // Process the API data and group them into boards based on status and priority
        const groupedBoards = groupDataIntoBoards(apiData, response.data);
        setBoards(groupedBoards);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  });

  // Function to group API data into boards based on priority(descending) and title(ascending)
  const orderDataIntoBoards = (apiData) => {
    if (!apiData) return [];

    const orderbyPriorityD = orderDatabyDescending(apiData);
    const orderbyTitle = orderDatabyAscending(apiData);

    let combinedBoards = [];
    if (orderingOption === "priority") {
      combinedBoards=orderbyPriorityD;
    } else if ( orderingOption === "title") {
      combinedBoards=orderbyTitle;
    }
    return combinedBoards;
  }

  const orderDatabyDescending = (apiData) => {
    const boardsByPriority = {};
  
    // Sort API data by priority in descending order
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
 // Define grouping by Title (Ascending)
const orderDatabyAscending = (apiData) => {
  const boardsByTitle = {};

  // Sort API data by title in ascending order
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

  // Function to handle grouping change
  const handleGroupingChange = (groupingValue) => {
    setGroupingOption(groupingValue);

    // Update the boards based on the selected grouping options
    const groupedBoards = groupDataIntoBoards(apiData);
    setBoards(groupedBoards);
  };

  // Function to handle ordering change
  const handleOrderingChange = (orderingValue) => {
    setOrderingOption(orderingValue);

    // Update the boards based on the selected ordering options
    const groupedBoards = orderDataIntoBoards(apiData);
    setBoards(groupedBoards);
  };
  return (
    <div className="app">
      <div className="app_nav">
        <DropdownMenu
          onGroupingChange={handleGroupingChange}
          onOrderingChange={handleOrderingChange}
        />
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
