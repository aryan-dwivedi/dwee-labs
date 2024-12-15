import React from "react";
import { User } from "../context/reducer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type EntityItemProps = {
  entity: User;
};

const EntityItem: React.FC<EntityItemProps> = ({ entity }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{entity.name}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <p className="text-sm text-gray-500">Gender: {entity.gender}</p>
      <p className="text-sm text-gray-500">Age: {entity.age}</p>
      <p className="text-sm text-gray-500">Email: {entity.email}</p>
    </CardContent>
  </Card>
);

export default EntityItem;