import React, { useState } from "react";
import {
  CheckSquare,
  Clock,
  User,
  AlertTriangle,
  Circle,
} from "react-feather";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";

function Card(props) {
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, tasks, labels, Name} = props.card;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_header">
        <div className="card_top_left">
            <span className="task-number">{id}</span>
            <span><User size={16} />{Name}</span>
        </div>
        </div>
        <div className="card_top">
          <div className="card_top_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
        </div>
        <div className="card_title">{title}</div>
        <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="card_footer_item">
              <CheckSquare className="card_footer_icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
          <div className="card_bottom_left">
            <span className="alert"></span>
            <AlertTriangle size={20} />
          </div>
          <div className="card_bottom_right">
            <span>
              <Circle size={12} />Feature Request
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
