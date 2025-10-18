import React, { useState } from "react";
import { Button } from "antd";
import SegmentModal from "./components/SegmentModel"

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Save Segment
      </Button>

      <SegmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;
