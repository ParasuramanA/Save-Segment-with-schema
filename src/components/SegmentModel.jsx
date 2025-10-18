import React, { useState,useEffect } from "react";
import { Modal, Input, Select, Button, Card } from "antd";
import axios from "axios";
import schemaOptions from "../schemaOptions";



const SegmentModal = ({ isOpen, onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [schemaList, setSchemaList] = useState([]);

   useEffect(() => {
    if (!isOpen) {
      setSegmentName("");
      setSelectedSchema(null);
      setSchemaList([]);
    }
  }, [isOpen]);

  const handleAddSchema = () => {
    if (!selectedSchema) return;

    const selectedItem = schemaOptions.find(o => o.value === selectedSchema);
    if (!selectedItem) return;

    setSchemaList(prev => [...prev, selectedItem]);
    setSelectedSchema(null);
  };

  const handleSaveSegment = async () => {
    const payload = {
      segment_name: segmentName,
      schema: schemaList.map(item => ({ [item.value]: item.label })),
    };

    try {
      await axios.post(import.meta.env.VITE_WEBHOOK_URL, payload);
      alert("Segment saved successfully!");
      onClose();
      setSegmentName("");
      setSchemaList([]);
    } catch (error) {
      console.error(error);
      alert("Error saving segment!");
    }
  };

  const availableOptions = schemaOptions.filter(
    option => !schemaList.find(item => item.value === option.value)
  );

  return (
    <Modal
      title="Save Segment"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div style={{ marginBottom: 16 }}>
        <label>Segment Name</label>
        <Input
          placeholder="Enter segment name"
          value={segmentName}
          onChange={e => setSegmentName(e.target.value)}
          style={{ marginTop: 8 }}
        />
      </div>

      <div>
        <label>Add schema to segment</label>
        <Select
          placeholder="Select schema"
          value={selectedSchema}
          onChange={setSelectedSchema}
          options={availableOptions}
          style={{ width: "100%", marginTop: 8 }}
        />
        <Button type="link" onClick={handleAddSchema}>
          + Add new schema
        </Button>
      </div>

      <Card
        style={{ backgroundColor: "#e6f4ff", marginTop: 16 }}
        title="Schemas"
      >
        {schemaList.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <Select
              value={item.value}
              style={{ width: "100%" }}
              onChange={(newVal) => {
                const updated = [...schemaList];
                updated[idx] = schemaOptions.find(o => o.value === newVal);
                setSchemaList(updated);
              }}
              options={schemaOptions.filter(
                o => !schemaList.find(s => s.value === o.value) || o.value === item.value
              )}
            />
          </div>
        ))}
      </Card>

      <Button
        type="primary"
        block
        style={{ marginTop: 16 }}
        onClick={handleSaveSegment}
        disabled={!segmentName || schemaList.length === 0}
      >
        Save the segment
      </Button>
    </Modal>
  );
};

export default SegmentModal;
