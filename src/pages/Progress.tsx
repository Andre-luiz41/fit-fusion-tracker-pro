
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeightProgress from "@/components/progress/WeightProgress";
import StrengthProgress from "@/components/progress/StrengthProgress";
import NutritionProgress from "@/components/progress/NutritionProgress";
import HydrationProgress from "@/components/progress/HydrationProgress";

const Progress = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Acompanhamento de Progresso</h1>
        
        <Tabs defaultValue="weight">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="weight">Peso</TabsTrigger>
            <TabsTrigger value="strength">Força</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrição</TabsTrigger>
            <TabsTrigger value="hydration">Hidratação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight">
            <WeightProgress />
          </TabsContent>
          
          <TabsContent value="strength">
            <StrengthProgress />
          </TabsContent>
          
          <TabsContent value="nutrition">
            <NutritionProgress />
          </TabsContent>
          
          <TabsContent value="hydration">
            <HydrationProgress />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Progress;
