import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";


const Loading = () => {
  return (
    <Container>
      <div className="w-full h-full p-8">
            {[1,2,3,4].map((repeat, i)=>(<article className="mx-auto my-3 w-4/5 bg-transparent border rounded-xl" key={i}>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col justify-center">
                        <Skeleton className="aspect-square rounded-xl" style={{width: '300px', height: '300px'}} />
                    </div>
                    <div className="w-4/5 flex flex-col justify-center space-y-3">
                        <Skeleton className="rounded-xl h-10" />
                        <Skeleton className="rounded-xl h-10" />
                        <Skeleton className="rounded-xl h-10" />
                    </div>
                </div>
            </article>))}
      </div>
    </Container>
  );
}
 
export default Loading;