export async function UpdateStreak(streakType: string) {
    try {
      const res = await fetch('http://localhost:5000/api/updateStreak', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            type: streakType
          })
      });

      if (res.status === 200) {
          console.log("Streak updated successfully");
      }
  } 
  catch (error) {
      console.log("Failed");
      console.error(error);
  }
  }

export async function GetStreak(streakType: string): Promise<number | undefined> {
    try {
        console.log("Attempintg fetch now");
        const res = await fetch(`http://localhost:5000/api/getStreak?type=${streakType}`, {
            credentials: 'include',
        });

        if (res.ok) {
            console.log("Retrieved streak");
            const data = await res.json();
            return data.streak;
        }
        else {
        }
    } catch (error) {
        console.error(error);
    }
}

export async function GetUsername(): Promise<string | undefined> {
    try {
        console.log("Here comes the username!");
        const res = await fetch('http://localhost:5000/api/getUsername', {
            credentials: 'include',
        });

        if (res.ok) {
            console.log("Retrieved username");
            console.log(res.body);
            const data = await res.json();
            return data.username;
        }
        else {
            console.log("Failed");
        }
    } catch (error) {
        console.log("Failed to fetch username");
        console.error(error);
    }
}