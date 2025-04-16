
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChevronRightIcon, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isRegistered, setIsRegistered] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "",
    confirmPassword: "",
    height: 178, // in cm
    weight: 75, // in kg
    goal: "build_muscle", 
    startDate: "2025-01-15",
    targetWeight: 80, // in kg
    profileImage: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.password !== profileData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would send this to a backend
    setIsRegistered(true);
    toast({
      title: "Registration Successful",
      description: "Your account has been created successfully."
    });
  };

  const goalProgress = () => {
    if (profileData.goal === "lose_weight") {
      // For weight loss, calculate progress based on starting weight and target weight
      // This is simplified and would need actual starting weight in a real app
      const weightDifference = 80 - profileData.weight; // Assuming starting weight was 80kg
      const targetDifference = 80 - profileData.targetWeight; 
      return Math.min(100, Math.max(0, (weightDifference / targetDifference) * 100));
    } else if (profileData.goal === "build_muscle") {
      // For muscle building, calculate progress based on target weight
      const weightDifference = profileData.weight - 70; // Assuming starting weight was 70kg
      const targetDifference = profileData.targetWeight - 70;
      return Math.min(100, Math.max(0, (weightDifference / targetDifference) * 100));
    }
    return 50; // Default for maintenance goals
  };

  if (!isRegistered) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Register to start tracking your fitness journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input 
                    id="register-name" 
                    name="name" 
                    value={profileData.name} 
                    onChange={handleInputChange} 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    name="email" 
                    type="email" 
                    value={profileData.email} 
                    onChange={handleInputChange} 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    name="password" 
                    type="password" 
                    value={profileData.password} 
                    onChange={handleInputChange} 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm">Confirm Password</Label>
                  <Input 
                    id="register-confirm" 
                    name="confirmPassword" 
                    type="password" 
                    value={profileData.confirmPassword} 
                    onChange={handleInputChange} 
                    required
                  />
                </div>
                <Button className="w-full" type="submit">Register</Button>
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto" 
                    onClick={() => setIsRegistered(true)}
                  >
                    Log in
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your personal information and goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4 mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.profileImage || "https://picsum.photos/seed/user/200"} alt={profileData.name} />
                    <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <p className="text-muted-foreground">{profileData.email}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Current Goal</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {profileData.goal === "lose_weight" 
                          ? "Lose Weight" 
                          : profileData.goal === "build_muscle" 
                            ? "Build Muscle" 
                            : profileData.goal === "improve_fitness"
                              ? "Improve Fitness"
                              : "Maintain Weight"}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => setActiveTab("edit")}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <Progress value={goalProgress()} className="h-2 mt-2" />
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Height</h3>
                      <p className="text-muted-foreground">{profileData.height} cm</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Weight</h3>
                      <p className="text-muted-foreground">{profileData.weight} kg</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">BMI</h3>
                      <p className="text-muted-foreground">
                        {(profileData.weight / Math.pow(profileData.height / 100, 2)).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your personal information and fitness goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={profileData.name} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={profileData.email} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input 
                        id="height" 
                        name="height" 
                        type="number" 
                        value={profileData.height}
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input 
                        id="weight" 
                        name="weight" 
                        type="number" 
                        value={profileData.weight}
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                      <Input 
                        id="targetWeight" 
                        name="targetWeight" 
                        type="number" 
                        value={profileData.targetWeight}
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goal">Fitness Goal</Label>
                      <Select 
                        value={profileData.goal} 
                        onValueChange={(value) => handleSelectChange("goal", value)}
                      >
                        <SelectTrigger id="goal">
                          <SelectValue placeholder="Select a goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose_weight">Lose Weight</SelectItem>
                          <SelectItem value="build_muscle">Build Muscle</SelectItem>
                          <SelectItem value="maintain">Maintain Weight</SelectItem>
                          <SelectItem value="improve_fitness">Improve Fitness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full md:w-auto" 
                    type="button" 
                    onClick={handleSaveChanges}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
