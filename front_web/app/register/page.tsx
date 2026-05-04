'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Zap } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const formSchema = z.object({
  nom: z.string().min(2, { message: "Nom trop court (min 2 caractères)" }).max(100),
  email: z.string().email({ message: "Email invalide" }),
  password: z.string()
    .min(8, { message: "Mot de passe trop court (min 8)" })
    .regex(/[A-Z]/, { message: "1 majuscule requise" })
    .regex(/[a-z]/, { message: "1 minuscule requise" })
    .regex(/\d/, { message: "1 chiffre requis" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "1 caractère spécial requis" }),
  confirmPassword: z.string(),
  id_foyer: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

type FormData = z.infer<typeof formSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: '',
      email: '',
      password: '',
      confirmPassword: '',
      id_foyer: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    // Note: Backend needs update for email support. Sending for now.
    const success = await register(data.nom, data.password, data.id_foyer || undefined)
    if (success) {
      router.push('/login')
    }
    setIsLoading(false)
  }

  const foyerOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          <Link href="/" className="text-xl font-bold text-primary">
            EléctriMada
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle className="text-2xl">Créer un compte</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jean@exemple.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Mot de passe sécurisé" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le mot de passe <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Répétez le mot de passe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="id_foyer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de foyers</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value || ''}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner..." />
                          </SelectTrigger>
                          <SelectContent>
                            {foyerOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option} foyer{option !== '1' ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  S'inscrire
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Se connecter
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

