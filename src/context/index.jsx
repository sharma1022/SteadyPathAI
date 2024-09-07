import React, { createContext, useContext, useState, useCallback } from "react";
import { db } from "../utils/dbConfig";
import { Users, Records } from "../utils/schema";

import { eq } from "drizzle-orm";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const getUsers = useCallback(async () => {
    try {
      const result = await db.select().from(Users).execute();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users.", error);
    }
  }, []);

  const getUserByEmail = useCallback(async (email) => {
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.createdBy, email))
        .execute();

      if (result.length > 0) {
        setCurrentUser(result[0]);
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    try {
      const newUser = await db
        .insert(Users)
        .values(userData)
        .returning({ id: Users.id, createdBy: Users.createdBy })
        .execute();
      setUsers((prevUsers) => [...prevUsers, newUser[0]]);
      return newUser[0];
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }, []);

  const getUserRecords = useCallback(async (email) => {
    try {
      const result = await db
        .select()
        .from(Records)
        .where(eq(Records.createdBy, email))
        .execute();
      setRecords(result);
    } catch (error) {
      console.error("Error fetching user records:", error);
    }
  }, []);

  const createRecord = useCallback(async (recordData) => {
    try {
      const newRecord = await db
        .insert(Records)
        .values(recordData)
        .returning({ id: Records.id })
        .execute();
      setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
      return newRecord[0];
    } catch (error) {
      console.error("Error creating record:", error);
      return null;
    }
  }, []);

  const updateRecord = useCallback(async (recordData) => {
    try {
      const { documentID, ...dataToUpdate } = recordData;
      console.log(documentID, dataToUpdate);
      const updatedRecords = await db
        .update(Records)
        .set(dataToUpdate)
        .where(eq(Records.id, documentID))
        .returning();
    } catch (error) {
      console.error("Error updating record:", error);
      return null;
    }
  }, []);

  const deleteRecord = useCallback(async (recordName) => {
    try {
      await db
        .delete(Records)
        .where(eq(Records.recordName, recordName))
        .execute();

      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.recordName !== recordName),
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  }, []);

  const deleteUser = useCallback(
    async (userId) => {
      try {
        await db.delete(Users).where(eq(Users.id, userId)).execute();
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

        if (currentUser?.id === userId) {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    [currentUser],
  );

  // Function to edit a user
  const editUser = useCallback(
    async (userId, updatedUserData) => {
      try {
        const updatedUser = await db
          .update(Users)
          .set({
            firstName: updatedUserData.firstName,
            lastName: updatedUserData.lastName,
            username: updatedUserData.username,
            age: updatedUserData.age,
            location: updatedUserData.location,
            createdBy: updatedUserData.createdBy,
          })
          .where(eq(Users.id, userId))
          .returning()
          .execute();

        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? updatedUser[0] : user)),
        );

        if (currentUser?.id === userId) {
          setCurrentUser(updatedUser[0]);
        }

        return updatedUser[0];
      } catch (error) {
        console.error("Error updating user:", error);
        return null;
      }
    },
    [currentUser],
  );

  return (
    <StateContext.Provider
      value={{
        users,
        records,
        getUsers,
        getUserByEmail,
        createUser,
        getUserRecords,
        createRecord,
        currentUser,
        updateRecord,
        editUser,
        deleteRecord,
        deleteUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the context
export const useStateContext = () => useContext(StateContext);
