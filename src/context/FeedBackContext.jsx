import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    { id: 1, text: 'This is feedback 1', rating: 10 },
    { id: 2, text: 'This is feedback 2', rating: 7 },
    { id: 3, text: 'This is feedback 3', rating: 9 },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  //delete Feedback
  const deleteFeedback = id => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter(item => item.id !== id));
    }
  };

  //Add feedback
  const addFeedback = newFeedback => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  // Update feedback Item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map(item => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  //set item to be updated
  const editFeedback = item => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
