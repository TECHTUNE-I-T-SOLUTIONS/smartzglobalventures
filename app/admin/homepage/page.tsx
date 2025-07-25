"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Save, Upload, Eye, Settings, Layout } from "lucide-react"
import Image from "next/image"

export default function AdminHomepagePage() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [heroData, setHeroData] = useState({
    title: "Welcome to Sm@rtz Global Enterprise",
    subtitle: "Your One-Stop Digital Store",
    description: "Discover premium computer accessories, books, and professional business services all in one place.",
    ctaText: "Shop Now",
    ctaLink: "/products",
    backgroundImage: "/placeholder.svg?height=600&width=1200&text=Hero+Background",
    showStats: true,
  })

  const [featuredProducts, setFeaturedProducts] = useState([
    { id: "1", name: "USB-C Fast Charger 65W", featured: true },
    { id: "2", name: "JavaScript: The Complete Guide", featured: true },
    { id: "3", name: "Business Card Design & Print", featured: false },
  ])

  const [siteSettings, setSiteSettings] = useState({
    siteName: "Sm@rtz Global Enterprise",
    tagline: "Your One-Stop Digital Store",
    logo: "/placeholder.svg?height=40&width=40&text=SG",
    favicon: "/favicon.ico",
    primaryColor: "#BEA525",
    secondaryColor: "#AAA99F",
    enableAnimations: true,
    enableThemeToggle: true,
    maintenanceMode: false,
  })

  const handleSaveHero = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Hero section updated",
        description: "Homepage hero section has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating the hero section.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Settings updated",
        description: "Site settings have been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating the settings.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const toggleFeaturedProduct = (productId: string) => {
    setFeaturedProducts((prev) =>
      prev.map((product) => (product.id === productId ? { ...product, featured: !product.featured } : product)),
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Homepage Management</h1>
          <p className="text-muted-foreground">Control your website's homepage content and appearance</p>
        </div>

        <Tabs defaultValue="hero" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="featured">Featured Products</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="mr-2 h-5 w-5" />
                  Hero Section
                </CardTitle>
                <CardDescription>Customize your homepage hero section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="heroTitle">Main Title</Label>
                      <Input
                        id="heroTitle"
                        value={heroData.title}
                        onChange={(e) => setHeroData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter main title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="heroSubtitle">Subtitle</Label>
                      <Input
                        id="heroSubtitle"
                        value={heroData.subtitle}
                        onChange={(e) => setHeroData((prev) => ({ ...prev, subtitle: e.target.value }))}
                        placeholder="Enter subtitle"
                      />
                    </div>

                    <div>
                      <Label htmlFor="heroDescription">Description</Label>
                      <Textarea
                        id="heroDescription"
                        value={heroData.description}
                        onChange={(e) => setHeroData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter description"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ctaText">CTA Button Text</Label>
                        <Input
                          id="ctaText"
                          value={heroData.ctaText}
                          onChange={(e) => setHeroData((prev) => ({ ...prev, ctaText: e.target.value }))}
                          placeholder="Button text"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ctaLink">CTA Button Link</Label>
                        <Input
                          id="ctaLink"
                          value={heroData.ctaLink}
                          onChange={(e) => setHeroData((prev) => ({ ...prev, ctaLink: e.target.value }))}
                          placeholder="/products"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showStats"
                        checked={heroData.showStats}
                        onCheckedChange={(checked) => setHeroData((prev) => ({ ...prev, showStats: checked }))}
                      />
                      <Label htmlFor="showStats">Show statistics section</Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Background Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Image
                          src={heroData.backgroundImage || "/placeholder.svg"}
                          alt="Hero background"
                          width={300}
                          height={150}
                          className="mx-auto rounded-lg mb-4"
                        />
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload New Image
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button onClick={handleSaveHero} disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Products</CardTitle>
                <CardDescription>Select which products to feature on the homepage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">Product ID: {product.id}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {product.featured && <Badge className="bg-yellow-500">Featured</Badge>}
                        <Switch checked={product.featured} onCheckedChange={() => toggleFeaturedProduct(product.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={siteSettings.siteName}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, siteName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        value={siteSettings.tagline}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, tagline: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={siteSettings.primaryColor}
                          onChange={(e) => setSiteSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                          className="w-16 h-10"
                        />
                        <Input
                          value={siteSettings.primaryColor}
                          onChange={(e) => setSiteSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                          placeholder="#BEA525"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={siteSettings.secondaryColor}
                          onChange={(e) => setSiteSettings((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                          className="w-16 h-10"
                        />
                        <Input
                          value={siteSettings.secondaryColor}
                          onChange={(e) => setSiteSettings((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                          placeholder="#AAA99F"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Toggles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableAnimations">Enable Animations</Label>
                      <p className="text-sm text-muted-foreground">Enable smooth animations throughout the site</p>
                    </div>
                    <Switch
                      id="enableAnimations"
                      checked={siteSettings.enableAnimations}
                      onCheckedChange={(checked) => setSiteSettings((prev) => ({ ...prev, enableAnimations: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableThemeToggle">Theme Toggle</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow users to switch between light and dark themes
                      </p>
                    </div>
                    <Switch
                      id="enableThemeToggle"
                      checked={siteSettings.enableThemeToggle}
                      onCheckedChange={(checked) =>
                        setSiteSettings((prev) => ({ ...prev, enableThemeToggle: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={siteSettings.maintenanceMode}
                      onCheckedChange={(checked) => setSiteSettings((prev) => ({ ...prev, maintenanceMode: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Homepage Preview</CardTitle>
                <CardDescription>Preview how your homepage will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-muted/20">
                  <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">{heroData.title}</h1>
                    <h2 className="text-xl text-primary">{heroData.subtitle}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{heroData.description}</p>
                    <Button className="bg-primary hover:bg-primary/90">{heroData.ctaText}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
