import React, { useState } from "react";
import Modal from "../../components/Modal";
const CreateRecordModal = ({ isOpen, onClose, onCreate }) => {
  const [folderName, setFolderName] = useState("");

  const handleCreate = () => {
    onCreate(folderName);
    setFolderName("");
  };
  return (
    <Modal
      title="Create Record"
      isOpen={isOpen}
      onClose={onClose}
      onAction={handleCreate}
      actionLabel="Create folder"
    >
      <div className="grid gap-y-4">
        <div>
          <label
            htmlFor="folder-name"
            className="mb-2 block text-sm text-gray-800 dark:text-white"
          >
            Record Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
              className="block w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateRecordModal;
