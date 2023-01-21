/*
    POKEBRAWLZ

    TO DO 
        BATTLE REPORT
            onClick of FIGHT button-
                Random move chosen by CPU ✅
                Displays that move- ✅
                Determines which pokemon goes first (pokemon.speed)-✅
                    speed could be a modifer to a random number? ✅
                    highest speed is 180- so maybe make a random number between 1 + 180 and add SPEED MOD? ✅
                Compares the power of move to HP of enemy- ✅
                    if it is higher, kills the pokemon!✅
                    if it is lower, the other pokemon acts!✅
                Display all this as a BATTLE LOG MODAL✅
            Resets on close ✅
            Gives player and CPU 4 new moves ✅
            Write more semantic text for battle report (Player / CPU instead of Pokemon name?)
        TUTORIAL
            Help Section (modal display)✅
            Write detailed instructions
            Add collapsable menus for the tutorials for ease of use.✅

        SCORING    
            Store Player and CPU score in Local Storage? ✅
            High score tracking.
            Perhaps game ends once you reach 6? Then shows the six pokemon you won with, and option to share as a tweet?

        SETTINGS 
            make a settings modal that can be opened and closed ✅
            option to change color palette ✅
            option to change fonts ✅ (and maybe font size?)
            store settings in local host so they are remembered on page reload ✅
            reset high score 
            SUPER STRETCH GOAL- ADD PvP mode!
        
        REFACTORING
        Remove transition time to button color changes. ✅
        Condense both player and computer acting first into a single function 
        that is called with faster and slower pokemon and moves-✅
        add second turn of combat (same function but with faster and slower reversed?)✅
        Add new moves being randomized after each turn.
        Adjust health values (currently thinking double the current hit points)✅
        Adjust accuracy of attacks- if accuracy is 100 && Power > 0 - Accuracy = (Accuracy - Math.floor(Power / 10))✅
        ^This means more powerful moves have lower accuracy
        Add random bounding / adjust special effects- 
            Defend- reduces Power by 50-100%
            Dodge- reduces Accuracy by 25-50%
            Focus- if the opponent misses their attack, your critical chance becomes 99%
        Add additional Special effects if the move is second-
            Dodge- doubles speed for next round.
            Defend- Reflect 10-50% of damage back to opponent
            Focus- increases Critical chance by 25-50%
        Randomize SPEDCIAL MOVES so the Special effects take a PENALTY to ACCURACY but increase the number of ROUNDS they are active for... 
        (10% per round, up to 5 rounds?)
        Re design the layout (split pokemon stats and move stats into two separate cards)


        NEW FEATURES
        Once per turn, option to change moves? 
        Add cpu choosing a new move after each turn.
        Add functionality that determines moves with 0 powers effect based on the 'damage class attribute-✅
        status- reduces the damage of the enemy's attack by 50-90% ✅
        physical- reduces accuracy of enemy's attack by 25-50% ✅
        special- increase critical hit chance to 50% for next attack ✅ 
        add critical hit chance (on a roll of 1-5, critical hit- power doubled) ✅


                    

            

*/