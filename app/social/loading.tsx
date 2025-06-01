import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container px-4 py-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-[400px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar izquierdo - Sugerencias */}
          <div className="hidden md:block">
            <Card>
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-8 w-16 rounded-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Feed central */}
          <div className="md:col-span-2">
            {/* Crear publicación */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {[1, 2, 3].map((i) => (
                          <Skeleton key={i} className="h-8 w-8 rounded-full" />
                        ))}
                      </div>
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feed de publicaciones */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />

                    {i % 2 === 0 && (
                      <div className="mt-3 rounded-md overflow-hidden border">
                        <div className="flex items-center p-3 gap-3">
                          <Skeleton className="h-12 w-12 rounded-sm" />
                          <div className="flex-1 min-w-0">
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <div className="flex justify-between w-full">
                      {[1, 2, 3, 4].map((j) => (
                        <Skeleton key={j} className="h-8 w-16" />
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
