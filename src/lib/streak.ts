export async function UpdateStreak() {
    try {
      const res = await fetch('http://localhost:5000/api/updateStreak', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
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

export async function GetStreak(): Promise<number | undefined> {
    try {
        const res = await fetch('http://localhost:5000/api/getStreak', {
            credentials: 'include',
        });

        if (res.ok) {
            console.log("Retrieved streak");
            console.log(res.body);
            const data = await res.json();
            return data.streak;
        }
        else {
            console.log("Failed");
        }
    } catch (error) {
        console.log("Failed to fetch streak");
        console.error(error);
    }
}