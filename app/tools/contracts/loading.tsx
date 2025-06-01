import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ContractsLoading() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-[300px] mx-auto" />

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-[180px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-[260px]" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-4 border-b bg-muted/50">
                <Skeleton className="h-5 w-full col-span-4" />
                <Skeleton className="h-5 w-full col-span-2 hidden md:block" />
                <Skeleton className="h-5 w-full col-span-2 hidden md:block" />
                <Skeleton className="h-5 w-full col-span-2 hidden md:block" />
                <Skeleton className="h-5 w-full col-span-2" />
              </div>

              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="grid grid-cols-12 gap-2 p-4 border-b items-center">
                  <div className="col-span-4 space-y-2">
                    <Skeleton className="h-5 w-[90%]" />
                    <Skeleton className="h-3 w-[70%]" />
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <Skeleton className="h-5 w-[80%]" />
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <Skeleton className="h-5 w-[60%]" />
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <Skeleton className="h-5 w-[70%]" />
                  </div>
                  <div className="col-span-8 md:col-span-2 flex justify-end md:justify-start gap-2">
                    <Skeleton className="h-8 w-[60px]" />
                    <Skeleton className="h-8 w-[80px]" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border rounded-md space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-8 w-[60px]" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
