import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";

import "./Board.css";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  const sortCards = () => {
    if (props.orderingOption === "priority") {
      return [...props.board.cards].sort((a, b) => b.priority - a.priority);
    } else if (props.orderingOption === "title") {
      return [...props.board.cards].sort((a, b) => a.title.localeCompare(b.title));
    }
    return props.board.cards;
  };

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {sortCards().map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}

      </div>
    </div>
  );
}

export default Board;
