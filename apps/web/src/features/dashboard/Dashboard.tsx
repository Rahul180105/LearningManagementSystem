import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Metric {i}</p>
            <h2 className="text-2xl font-bold">1234</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}