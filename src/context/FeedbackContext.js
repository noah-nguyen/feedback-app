import { v4 as uuidv4 } from 'uuid'
import {createContext, useState} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is from context 1',
            rating: 10
        },

        {
            id: 2,
            text: 'This item is from context 2',
            rating: 5
        },

        {
            id: 3,
            text: 'This item is from context 3',
            rating: 7
        }
    ])

    //State that holds item
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    //Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback,...feedback])
    }

    //Delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id ))
        }
    }

    //Update item
    const updateFeedback = (id, updateItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? {...item, ...updateItem} : item))
            )
    }

    // Set item to be updated, function run when edit icon click
    const editFeedback = (item) => {
        setFeedbackEdit ({
            item,
            edit: true
        })
    }

    return (
    <FeedbackContext.Provider 
        value={{
            feedback,
            updateFeedback,
            deleteFeedback,
            addFeedback,
            editFeedback,
            feedbackEdit
        }}
    >
        {children}
    </FeedbackContext.Provider>
    )
}

export default FeedbackContext