import List from "../models/list.model.js";

const createList = async (req, res) => {
    try {
        const {title, description} = req.body;

        // The user ID comes from the authenticated user
        const userId = req.body.userId;

        const newList = await List.create({
            title,
            description,
            user: userId
        });

        res.status(201).json({
            success: true,
            data: newList
        })
    } catch (error) {
        console.error("Error creating list:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create list"
        });
    }
};

const editList = async (req, res) => {
    try {
        const {title, description} = req.body;
        const listId = req.params.id;
        const userId = req.body.userId;
        
        const existingList = await List.findById(listId);

        //Checks if user owns the list
        if(!existingList){
            return res.status(403).json({
                success: false,
                message: "List not found"
            });
        }

        //Checs if user owns this list
        if(existingList.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to edit this list"
            });
        }

        //Update List
        const updatedList = await List.findByIdAndUpdate(
            listId,
            { title, description },
            { new: true }
        );

        res.status(200).json({
            success: true,
            date: updatedList
        })

    } catch (error) {
        console.error("Error updating list:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update list"
        });
    }
}

const getUserLists = async (req, res) => {
    try {
        const userId = req.params.userId;

        const lists = await List.find({user: userId});

        res.status(200).json({
            success: true,
            count: lists.length,
            data: lists
    })
    } catch (error) {
        console.error("Error fetching user lists:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch lists"
        });
    }
}

export {createList, getUserLists, editList};
