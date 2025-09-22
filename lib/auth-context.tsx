"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  userProfile: any; // Add userProfile for debugging
  refreshProfile: () => Promise<void>; // Add refresh function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  const supabase = createSupabaseBrowserClient();

  // Helper function to fetch profile via API
  const fetchProfile = async (userId: string) => {
    try {
      const response = await fetch(`/api/profile?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        return { data: data.profile, error: null };
      } else {
        return { data: null, error: data.error };
      }
    } catch (error) {
      return { data: null, error: error };
    }
  };

  // Helper function to create profile via API
  const createProfile = async (
    userId: string,
    email: string,
    fullName?: string,
    role = "USER"
  ) => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          email,
          fullName,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return { data: data.profile, error: null };
      } else {
        return { data: null, error: data.error };
      }
    } catch (error) {
      return { data: null, error: error };
    }
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Get user profile using API route
          console.log("🔍 Fetching profile for user:", session.user.id);
          const { data: profile, error: profileError } = await fetchProfile(
            session.user.id
          );

          if (mounted) {
            console.log("📊 Profile fetch result:", { profile, profileError });
            if (profile) {
              setUserProfile(profile);
              console.log("✅ Profile loaded:", profile);
            } else if (
              profileError &&
              typeof profileError === "string" &&
              profileError.includes("not found")
            ) {
              // Profile doesn't exist, create it using API
              console.log(
                "Profile not found, creating for user:",
                session.user.email
              );
              try {
                const { data: newProfile, error: createError } =
                  await createProfile(
                    session.user.id,
                    session.user.email!,
                    session.user.user_metadata?.full_name,
                    "USER"
                  );

                if (!createError && newProfile) {
                  setUserProfile(newProfile);
                } else {
                  console.error("Error creating missing profile:", createError);
                }
              } catch (error) {
                console.error("Error creating missing profile:", error);
              }
            } else {
              console.error("Error fetching profile:", profileError);
            }
          }
        }

        if (mounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        try {
          // Get user profile using API route
          console.log(
            "🔍 Auth change - fetching profile for user:",
            session.user.id
          );
          const { data: profile, error: profileError } = await fetchProfile(
            session.user.id
          );

          if (mounted) {
            console.log("📊 Auth change - profile fetch result:", {
              profile,
              profileError,
            });
            if (profile) {
              setUserProfile(profile);
              console.log("✅ Auth change - profile loaded:", profile);
            } else if (
              profileError &&
              typeof profileError === "string" &&
              profileError.includes("not found")
            ) {
              // Profile doesn't exist, create it using API
              console.log(
                "Profile not found during auth change, creating for user:",
                session.user.email
              );
              try {
                const { data: newProfile, error: createError } =
                  await createProfile(
                    session.user.id,
                    session.user.email!,
                    session.user.user_metadata?.full_name,
                    "USER"
                  );

                if (!createError && newProfile) {
                  setUserProfile(newProfile);
                } else {
                  console.error(
                    "Error creating missing profile in auth change:",
                    createError
                  );
                }
              } catch (error) {
                console.error(
                  "Error creating missing profile in auth change:",
                  error
                );
              }
            } else {
              console.error(
                "Error fetching profile during auth change:",
                profileError
              );
            }
          }
        } catch (error) {
          console.error("Error getting user profile:", error);
        }
      } else {
        setUserProfile(null);
      }

      if (mounted) {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    // Create profile if signup successful and user is created
    if (!error && data.user) {
      try {
        // Check if profile already exists (trigger might have created it)
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", data.user.id)
          .single();

        // If profile doesn't exist, create it manually using API
        if (!existingProfile) {
          const { error: profileError } = await createProfile(
            data.user.id,
            data.user.email!,
            fullName,
            "USER"
          );

          if (profileError) {
            console.error("Error creating profile:", profileError);
            // Don't fail signup if profile creation fails - we can retry later
          }
        }
      } catch (profileError) {
        console.error("Error handling profile creation:", profileError);
        // Don't fail signup if profile handling fails
      }
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const refreshProfile = async () => {
    if (!user) {
      console.log("❌ No user to refresh profile for");
      return;
    }

    try {
      console.log(
        "🔄 Refreshing profile for user:",
        user.email,
        "ID:",
        user.id
      );
      const { data: profile, error: profileError } = await fetchProfile(
        user.id
      );

      console.log("📊 Refresh result:", { profile, profileError });

      if (profile) {
        setUserProfile(profile);
        console.log("✅ Profile refreshed successfully:", profile);
      } else {
        console.error("❌ Error refreshing profile:", profileError);
        setUserProfile(null);
      }
    } catch (error) {
      console.error("❌ Error in refreshProfile:", error);
      setUserProfile(null);
    }
  };

  const isAdmin = userProfile?.role === "ADMIN";

  // Debug logging
  useEffect(() => {
    console.log("Auth Debug:", {
      user: user?.email || "No user",
      userProfile: userProfile
        ? {
            email: userProfile.email,
            role: userProfile.role,
            id: userProfile.id,
          }
        : "No profile",
      isAdmin,
      isLoading,
    });
  }, [user, userProfile, isAdmin, isLoading]);

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    userProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
